"""Genera una texture di fumo scura tipo mockup Toros: grandi volute morbide che
fluiscono in diagonale (seta/fumo), sfondo quasi nero, centro luminoso, bordi neri.
Tutto in float per evitare artefatti (curve di livello da quantizzazione); si genera
con margine e si ritaglia il centro per togliere le striature di bordo del warp."""
import numpy as np
from PIL import Image, ImageFilter

W, H = 2560, 1440
M = 360                      # margine generato e poi ritagliato
GW, GH = W + 2 * M, H + 2 * M
rng = np.random.default_rng(11)

def aniso_noise(w, h, beta, theta_deg, sx, sy):
    """Rumore frattale con spettro anisotropo ruotato: pieghe grandi e allungate."""
    wn = rng.standard_normal((h, w))
    f = np.fft.fftshift(np.fft.fft2(wn))
    cy, cx = h / 2, w / 2
    yy, xx = np.mgrid[0:h, 0:w]
    u = xx - cx; v = yy - cy
    t = np.deg2rad(theta_deg)
    up = u * np.cos(t) + v * np.sin(t)
    vp = -u * np.sin(t) + v * np.cos(t)
    r = np.sqrt((up / sx) ** 2 + (vp / sy) ** 2)
    r[int(cy), int(cx)] = 1.0
    f *= 1.0 / (r ** beta)
    img = np.fft.ifft2(np.fft.ifftshift(f)).real
    img -= img.min(); img /= img.max()
    return img

def blur_float(a, sigma):
    """Gaussian blur esatto in frequenza, resta in float (niente quantizzazione)."""
    h, w = a.shape
    ky = np.fft.fftfreq(h)[:, None]
    kx = np.fft.fftfreq(w)[None, :]
    g = np.exp(-2.0 * (np.pi * sigma) ** 2 * (kx ** 2 + ky ** 2))
    return np.fft.ifft2(np.fft.fft2(a) * g).real

def warp(field, wx, wy, amp):
    """Domain warp bilineare in float: piega le volute per renderle organiche."""
    h, w = field.shape
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float64)
    sx = np.clip(xx + wx * amp, 0, w - 1.001)
    sy = np.clip(yy + wy * amp, 0, h - 1.001)
    x0 = np.floor(sx).astype(int); y0 = np.floor(sy).astype(int)
    x1 = x0 + 1; y1 = y0 + 1
    fx = sx - x0; fy = sy - y0
    a = field[y0, x0]; b = field[y0, x1]; c = field[y1, x0]; d = field[y1, x1]
    return a * (1 - fx) * (1 - fy) + b * fx * (1 - fy) + c * (1 - fx) * fy + d * fx * fy

# Pieghe grandi allungate in diagonale + velo piu' fine, domain-warpate (warp smooth)
big = aniso_noise(GW, GH, beta=2.5, theta_deg=-26, sx=2.6, sy=1.0)
mid = aniso_noise(GW, GH, beta=2.2, theta_deg=-26, sx=2.0, sy=1.1)
wx = blur_float(aniso_noise(GW, GH, beta=2.6, theta_deg=10, sx=1.4, sy=1.4) - 0.5, 6)
wy = blur_float(aniso_noise(GW, GH, beta=2.6, theta_deg=80, sx=1.4, sy=1.4) - 0.5, 6)
field = 0.7 * big + 0.3 * mid
field = warp(field, wx, wy, amp=90)
field = blur_float(field, 2.2)                    # ammorbidisce in float -> niente curve di livello
field = (field - field.min()) / (field.max() - field.min())

# Lighting radente: creste illuminate larghe
gy, gx = np.gradient(field)
az = np.deg2rad(238)
emboss = gx * np.cos(az) + gy * np.sin(az)
emboss /= (np.abs(emboss).max() + 1e-9)
highlight = blur_float(np.clip(emboss * 1.35, 0, 1), 1.2)

# Luminanza: quasi nero, struttura dalle creste + velo morbido del campo
lum = highlight * 0.82 + field * 0.12
lum = np.clip(lum, 0, 1) ** 1.2

# Ritaglia il centro (via i bordi col warp)
def crop(a):
    return a[M:M + H, M:M + W]
lum = crop(lum)

# Maschera radiale: centro luminoso, bordi -> nero
yy, xx = np.mgrid[0:H, 0:W]
nx = (xx - W / 2) / (W * 0.66)
ny = (yy - H * 0.42) / (H * 0.66)
rad = np.sqrt(nx ** 2 + ny ** 2)
vignette = np.clip(1.0 - rad ** 1.9, 0, 1) ** 1.3
lum *= (0.14 + 0.86 * vignette)

# Bloom centrale dietro al logo
bloom = np.exp(-((nx * 1.8) ** 2 + (ny * 2.0) ** 2)) * 0.18
lum = np.clip(lum + bloom, 0, 1)

# Tinta leggermente fredda + base minima
r = lum * 0.90 + 0.012
g = lum * 0.95 + 0.015
b = lum * 1.00 + 0.020
arr = (np.clip(np.stack([r, g, b], -1), 0, 1) * 255).astype(np.uint8)

im = Image.fromarray(arr).filter(ImageFilter.GaussianBlur(1.2))
import os
out = os.path.join(os.path.dirname(os.path.abspath(__file__)), "hero-smoke.jpg")
im.save(out, "JPEG", quality=88, optimize=True)
print("saved", out, im.size)

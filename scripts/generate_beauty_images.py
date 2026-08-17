from pathlib import Path
from PIL import Image, ImageDraw, ImageFilter

root = Path(__file__).resolve().parent.parent
img_dir = root / 'img'
img_dir.mkdir(exist_ok=True)

scenes = [
    ('instalacion_estetica_1.webp', 'salon'),
    ('instalacion_estetica_2.webp', 'hair'),
    ('instalacion_estetica_3.webp', 'nails'),
    ('instalacion_estetica_4.webp', 'pedicure'),
    ('instalacion_estetica_5.webp', 'services'),
    ('instalacion_estetica_6.webp', 'lashes'),
    ('location.webp', 'salon'),
]

palette_by_kind = {
    'salon': ((247, 235, 231), (219, 189, 190), (214, 122, 129), (247, 244, 246), (245, 212, 180)),
    'hair': ((250, 240, 234), (201, 169, 153), (157, 117, 110), (254, 252, 251), (218, 174, 154)),
    'nails': ((252, 242, 242), (214, 181, 181), (196, 124, 115), (252, 247, 247), (228, 185, 168)),
    'pedicure': ((252, 243, 238), (208, 183, 173), (176, 116, 115), (255, 250, 247), (221, 178, 154)),
    'services': ((246, 231, 230), (213, 181, 180), (182, 116, 120), (250, 241, 241), (233, 194, 161)),
    'lashes': ((245, 230, 232), (217, 177, 182), (182, 113, 119), (252, 246, 248), (237, 196, 167)),
}


def create_scene(name, kind):
    w, h = 1200, 900
    bg1, bg2, accent, panel, warm = palette_by_kind[kind]
    image = Image.new('RGB', (w, h), bg1)
    draw = ImageDraw.Draw(image)

    for y in range(h):
        t = y / max(1, h - 1)
        r = int(bg1[0] * (1 - t) + bg2[0] * t)
        g = int(bg1[1] * (1 - t) + bg2[1] * t)
        b = int(bg1[2] * (1 - t) + bg2[2] * t)
        draw.line((0, y, w, y), fill=(r, g, b))

    glow = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    gdraw = ImageDraw.Draw(glow)
    gdraw.ellipse((80, 80, 420, 420), fill=(255, 255, 255, 75))
    gdraw.ellipse((880, 120, 1200, 500), fill=(255, 236, 204, 100))
    gdraw.ellipse((860, 580, 1180, 920), fill=(183, 103, 115, 90))
    image = Image.alpha_composite(image.convert('RGBA'), glow).convert('RGB')

    frame = Image.new('RGBA', (w, h), (0, 0, 0, 0))
    fdraw = ImageDraw.Draw(frame)
    fdraw.rounded_rectangle((120, 120, 1080, 780), radius=38, fill=(255, 255, 255, 95))
    fdraw.rounded_rectangle((160, 180, 1040, 720), radius=28, fill=(255, 255, 255, 65))
    image = Image.alpha_composite(image.convert('RGBA'), frame).convert('RGB')

    d = ImageDraw.Draw(image)

    if kind == 'salon':
        d.rounded_rectangle((290, 260, 910, 610), radius=26, fill=(246, 238, 234))
        d.rounded_rectangle((350, 320, 850, 540), radius=20, fill=(255, 255, 255, 120))
        d.rounded_rectangle((380, 560, 820, 690), radius=18, fill=(162, 119, 110))
        for x in (430, 520, 610, 700, 790):
            d.rounded_rectangle((x, 600, x + 70, 700), radius=14, fill=(255, 255, 255, 120))
        d.ellipse((566, 200, 634, 268), fill=warm)

    elif kind == 'hair':
        d.rounded_rectangle((180, 180, 1020, 710), radius=28, fill=(249, 240, 236))
        for x in (250, 420, 590, 760, 930):
            d.rounded_rectangle((x, 250, x + 110, 560), radius=16, fill=(255, 255, 255, 100))
            d.ellipse((x + 20, 220, x + 90, 290), fill=warm)
            d.line((x + 55, 290, x + 55, 520), fill=(113, 82, 84), width=12)
        d.rounded_rectangle((280, 620, 920, 680), radius=14, fill=(158, 120, 112))

    elif kind == 'nails':
        d.rounded_rectangle((180, 180, 1020, 700), radius=28, fill=(251, 241, 239))
        for x in (250, 420, 590, 760, 930):
            d.rounded_rectangle((x, 260, x + 90, 540), radius=18, fill=(255, 255, 255, 90))
            d.rounded_rectangle((x + 20, 320, x + 70, 500), radius=12, fill=accent)
            d.ellipse((x + 20, 250, x + 70, 300), fill=warm)
        d.rounded_rectangle((260, 620, 940, 680), radius=16, fill=(170, 138, 123))

    elif kind == 'pedicure':
        d.ellipse((350, 230, 850, 630), fill=(255, 255, 255, 70))
        for x in (200, 420, 640, 860):
            d.rounded_rectangle((x, 430, x + 120, 620), radius=18, fill=(255, 255, 255, 100))
            d.ellipse((x + 15, 380, x + 105, 470), fill=warm)
        d.rounded_rectangle((500, 310, 700, 660), radius=16, fill=(255, 255, 255, 80))
        d.rectangle((560, 620, 640, 690), fill=(195, 154, 140))

    elif kind == 'services':
        for i, x in enumerate((260, 470, 680, 890)):
            color = ((214, 113, 122), (232, 196, 146), (151, 108, 117), (223, 176, 178))[i]
            d.rounded_rectangle((x, 350, x + 170, 610), radius=22, fill=(255, 255, 255, 100))
            d.ellipse((x + 35, 260, x + 135, 360), fill=color)
            d.line((x + 85, 360, x + 85, 550), fill=(79, 63, 66), width=16)
        d.rounded_rectangle((260, 640, 940, 690), radius=18, fill=(150, 120, 114))

    elif kind == 'lashes':
        d.ellipse((450, 200, 760, 620), fill=(255, 255, 255, 60))
        for x in (300, 500, 700, 900):
            d.arc((x, 320, x + 180, 540), start=200, end=340, fill=(80, 56, 58), width=12)
            d.arc((x + 20, 335, x + 200, 550), start=200, end=340, fill=(245, 213, 176), width=7)
        d.ellipse((490, 250, 710, 330), fill=(244, 211, 176))
        d.rounded_rectangle((340, 620, 860, 675), radius=18, fill=(156, 112, 116))

    d.rounded_rectangle((20, 20, 1180, 880), radius=26, outline=(255, 255, 255, 90), width=6)
    image = image.filter(ImageFilter.GaussianBlur(0.2))
    image.save(img_dir / name, 'WEBP', quality=90)


for name, kind in scenes:
    create_scene(name, kind)
    print(f'Created {name}')

print('Done')

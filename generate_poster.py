import os
from PIL import Image, ImageDraw, ImageFont, ImageEnhance

def create_poster():
    W, H = 1200, 675
    
    # 1. Load background image
    bg_path = os.path.join("public", "og-bg.jpg")
    if not os.path.exists(bg_path):
        print(f"Error: {bg_path} not found")
        return
        
    bg = Image.open(bg_path).convert("RGBA")
    bg = bg.resize((W, H), Image.Resampling.LANCZOS)
    
    # Slightly dim and enhance contrast for premium readability
    enhancer = ImageEnhance.Brightness(bg)
    bg = enhancer.enhance(0.72)
    
    # 2. Create gradient overlay
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    draw_overlay = ImageDraw.Draw(overlay)
    
    for y in range(H):
        top_alpha = max(0, int(220 * (1 - y / 260)))
        bot_alpha = max(0, int(230 * ((y - 320) / 355))) if y > 320 else 0
        alpha = min(240, top_alpha + bot_alpha + 35)
        draw_overlay.line([(0, y), (W, y)], fill=(8, 14, 22, alpha))
        
    bg = Image.alpha_composite(bg, overlay)
    
    # 3. Fonts (Segoe UI Bold on Windows has 100% full coverage of Georgian + Digits + Punctuation + Latin)
    font_bold = "C:/Windows/Fonts/segoeuib.ttf"
    font_black = "C:/Windows/Fonts/segoeuib.ttf"
    font_latin = "C:/Windows/Fonts/segoeuib.ttf"
    
    f_badge = ImageFont.truetype(font_bold, 16)
    f_sub = ImageFont.truetype(font_bold, 17)
    f_title = ImageFont.truetype(font_black, 35)
    f_card_tag = ImageFont.truetype(font_bold, 13)
    f_card_amount = ImageFont.truetype(font_black, 23)
    f_card_title = ImageFont.truetype(font_black, 19)
    f_card_body = ImageFont.truetype(font_bold, 13)
    f_card_highlight = ImageFont.truetype(font_bold, 12)
    f_bottom = ImageFont.truetype(font_bold, 15)
    f_url = ImageFont.truetype(font_latin, 15)
    
    draw_img = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    d = ImageDraw.Draw(draw_img)
    
    # --- A. Top Pill Badge ---
    badge_text = "საინიციატივო ჯგუფი  •  გაუზიარე მომავალს  •  შილდა"
    bbox = d.textbbox((0, 0), badge_text, font=f_badge)
    bw, bh = bbox[2] - bbox[0], bbox[3] - bbox[1]
    bx, by = (W - bw - 48) // 2, 28
    
    d.rounded_rectangle([bx, by, bx + bw + 48, by + bh + 16], radius=20, 
                        fill=(16, 185, 129, 40), outline=(52, 211, 153, 170), width=2)
    d.text((bx + 24, by + 7), badge_text, font=f_badge, fill=(167, 243, 208, 255))
    
    # --- B. Subtitle & Main Title ---
    sub_text = "ოფიციალური ანგარიში  •  თანხები სრულად გადანაწილდა"
    bbox_sub = d.textbbox((0, 0), sub_text, font=f_sub)
    sw = bbox_sub[2] - bbox_sub[0]
    d.text(((W - sw) // 2 + 1, 86 + 1), sub_text, font=f_sub, fill=(0, 0, 0, 220))
    d.text(((W - sw) // 2, 86), sub_text, font=f_sub, fill=(251, 191, 36, 255))
    
    title_text = "დაპირებისამებრ — 4 600 ლარი სრულად გადანაწილდა!"
    bbox_title = d.textbbox((0, 0), title_text, font=f_title)
    tw = bbox_title[2] - bbox_title[0]
    
    for dx, dy in [(-2, -2), (2, -2), (-2, 2), (2, 2), (0, 3), (0, 5)]:
        d.text(((W - tw) // 2 + dx, 120 + dy), title_text, font=f_title, fill=(0, 0, 0, 230))
    d.text(((W - tw) // 2, 120), title_text, font=f_title, fill=(255, 255, 255, 255))
    
    # --- C. Two Showcase Cards ---
    card_y = 195
    card_h = 260
    card_w = 540
    card1_x = 45
    card2_x = W - 45 - card_w
    
    # 1. Card Left: Mariam Mamulashvili
    d.rounded_rectangle([card1_x, card_y, card1_x + card_w, card_y + card_h], radius=24,
                        fill=(15, 23, 42, 225), outline=(244, 63, 94, 180), width=2)
    d.line([(card1_x + 24, card_y + 58), (card1_x + card_w - 24, card_y + 58)], fill=(255, 255, 255, 30), width=1)
    
    d.text((card1_x + 24, card_y + 22), "მთავარი დახმარება • 6 წლის მარიამი", font=f_card_tag, fill=(253, 164, 175, 255))
    
    amt1_text = "3 000 ლარი"
    bbox_amt1 = d.textbbox((0, 0), amt1_text, font=f_card_amount)
    amt1_w = bbox_amt1[2] - bbox_amt1[0]
    amt1_x = card1_x + card_w - 24 - amt1_w - 20
    d.rounded_rectangle([amt1_x, card_y + 14, amt1_x + amt1_w + 20, card_y + 48], radius=10,
                        fill=(244, 63, 94, 60), outline=(244, 63, 94, 150), width=1)
    d.text((amt1_x + 10, card_y + 15), amt1_text, font=f_card_amount, fill=(255, 228, 230, 255))
    
    d.text((card1_x + 24, card_y + 75), "მარიამ მამულაშვილის რეაბილიტაცია", font=f_card_title, fill=(255, 255, 255, 255))
    
    m_line1 = "დიაგნოზი: აუტოიმუნური ენცეფალიტი."
    m_line2 = "თანხა სრულად მოხმარდება აუცილებელ სარეაბილიტაციო კურსს."
    m_line3 = "მარიამს ვუსურვებთ ჯანმრთელობასა და სრულ გამოჯანმრთელებას!"
    d.text((card1_x + 24, card_y + 118), m_line1, font=f_card_body, fill=(254, 205, 211, 255))
    d.text((card1_x + 24, card_y + 148), m_line2, font=f_card_body, fill=(203, 213, 225, 255))
    d.text((card1_x + 24, card_y + 185), m_line3, font=f_card_highlight, fill=(110, 231, 183, 255))
    
    # 2. Card Right: 4 Families
    d.rounded_rectangle([card2_x, card_y, card2_x + card_w, card_y + card_h], radius=24,
                        fill=(15, 23, 42, 225), outline=(6, 182, 212, 180), width=2)
    d.line([(card2_x + 24, card_y + 58), (card2_x + card_w - 24, card_y + 58)], fill=(255, 255, 255, 30), width=1)
    
    d.text((card2_x + 24, card_y + 22), "თანადგომა • 4 მრავალშვილიანი ოჯახი", font=f_card_tag, fill=(103, 232, 249, 255))
    
    amt2_text = "1 600 ლარი"
    bbox_amt2 = d.textbbox((0, 0), amt2_text, font=f_card_amount)
    amt2_w = bbox_amt2[2] - bbox_amt2[0]
    amt2_x = card2_x + card_w - 24 - amt2_w - 20
    d.rounded_rectangle([amt2_x, card_y + 14, amt2_x + amt2_w + 20, card_y + 48], radius=10,
                        fill=(6, 182, 212, 60), outline=(6, 182, 212, 150), width=1)
    d.text((amt2_x + 10, card_y + 15), amt2_text, font=f_card_amount, fill=(207, 250, 254, 255))
    
    d.text((card2_x + 24, card_y + 75), "თანაბრად 400-400 ლარი გადაეცათ:", font=f_card_title, fill=(255, 255, 255, 255))
    
    fams = [
        "•  ბეგაშვილების ოჯახი",
        "•  ხუციშვილების ოჯახი",
        "•  მამადაშვილების ოჯახი",
        "•  კიკოლაშვილ-ფერიაშვილები"
    ]
    px_coords = [
        (card2_x + 24, card_y + 120),
        (card2_x + 274, card_y + 120),
        (card2_x + 24, card_y + 175),
        (card2_x + 274, card_y + 175)
    ]
    for idx, (px, py) in enumerate(px_coords):
        f_name = fams[idx]
        d.rounded_rectangle([px, py, px + 236, py + 44], radius=12,
                            fill=(30, 41, 59, 180), outline=(51, 65, 85, 200), width=1)
        d.text((px + 14, py + 12), f_name, font=f_card_body, fill=(241, 245, 249, 255))
        
    # --- D. Bottom Bar ---
    bar_y = 582
    bar_h = 60
    bar_w = W - 90
    bar_x = 45
    d.rounded_rectangle([bar_x, bar_y, bar_x + bar_w, bar_y + bar_h], radius=18,
                        fill=(15, 23, 42, 235), outline=(251, 191, 36, 140), width=2)
    
    grat_text = "მადლობა თითოეულ თქვენგანს თანადგომისთვის!"
    d.text((bar_x + 24, bar_y + 19), grat_text, font=f_bottom, fill=(248, 250, 252, 255))
    
    prom_text = "შევხვდებით მომდევნო წელს!"
    bbox_p = d.textbbox((0, 0), prom_text, font=f_bottom)
    pw = bbox_p[2] - bbox_p[0]
    d.text(((W - pw) // 2 + 50, bar_y + 19), prom_text, font=f_bottom, fill=(251, 191, 36, 255))
    
    url_text = "gauziare.ge"
    bbox_u = d.textbbox((0, 0), url_text, font=f_url)
    uw = bbox_u[2] - bbox_u[0]
    ux = bar_x + bar_w - uw - 36
    d.rounded_rectangle([ux, bar_y + 12, ux + uw + 24, bar_y + bar_h - 12], radius=10,
                        fill=(16, 185, 129, 45), outline=(52, 211, 153, 140), width=1)
    d.text((ux + 12, bar_y + 18), url_text, font=f_url, fill=(52, 211, 153, 255))
    
    # Composite all layers
    final_img = Image.alpha_composite(bg, draw_img)
    final_rgb = final_img.convert("RGB")
    
    output_files = [
        os.path.join("public", "og-charity-report-2026.jpg"),
        os.path.join("public", "og-charity.jpg"),
        os.path.join("public", "og-image.jpg"),
        os.path.join("public", "og-champions.jpg"),
        os.path.join("public", "og-final-night.jpg"),
        os.path.join("out", "og-charity-report-2026.jpg"),
        os.path.join("out", "og-charity.jpg"),
        os.path.join("out", "og-image.jpg"),
        os.path.join("out", "og-champions.jpg"),
        os.path.join("out", "og-final-night.jpg")
    ]
    
    for out_path in output_files:
        dir_name = os.path.dirname(out_path)
        if os.path.exists(dir_name):
            final_rgb.save(out_path, "JPEG", quality=95, optimize=True)
            print(f"[OK] Saved {out_path}")
            
    final_img.save(os.path.join("public", "og-charity.png"), "PNG")
    final_img.save(os.path.join("public", "og-image.png"), "PNG")
    print("[OK] Saved PNG versions")
    print("\nPoster generation completed successfully!")

if __name__ == "__main__":
    create_poster()

from PIL import Image

# Open the first slide
img = Image.open('assets/cellmark-case-study/1_CROPS-20-Project-Case-Study.png')

# Dimensions are (2400, 1350)
# Let's crop the right part (from x = 1200 onwards)
width, height = img.size
crop_box = (1200, 0, width, height)
cropped_img = img.crop(crop_box)

# Crop transparent/white margins if needed, but since it's line art on a white background,
# let's just save it. We can also make the background transparent if we want,
# but a clean white background or keeping it as is is perfectly fine since the slide itself is white.
# Let's save it as assets/cellmark-case-study/cargo-ship-illustration.png
cropped_img.save('assets/cellmark-case-study/cargo-ship-illustration.png')
print("Successfully cropped illustration!")

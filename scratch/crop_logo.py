from PIL import Image

img = Image.open('assets/cellmark-logo.png')
width, height = img.size

# The text starts around X=320. Let's crop it to keep only the text.
cropped_img = img.crop((320, 0, width, height))
cropped_img.save('assets/cellmark-logo.png')
print("Successfully cropped logo to remove the left-side tree icon.")

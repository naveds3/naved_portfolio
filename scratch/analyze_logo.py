from PIL import Image

img = Image.open('assets/cellmark-logo.png')
width, height = img.size

# Let's sum the opacity (alpha channel) of each column
alpha_sums = []
for x in range(width):
    col_alpha_sum = sum(img.getpixel((x, y))[3] for y in range(height))
    alpha_sums.append(col_alpha_sum)

# Let's print out the column sums where there is silence (no pixels or very low opacity)
# This will help us find the split point between the tree logo and the text.
print("Width:", width)
for x in range(0, width, 10):
    chunk = alpha_sums[x:x+10]
    avg = sum(chunk) / len(chunk)
    print(f"X: {x}-{x+10} avg alpha sum: {avg}")

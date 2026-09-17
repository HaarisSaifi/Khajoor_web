import os
import sys
from PIL import Image
from rembg import remove, new_session

# Use u2netp (tiny 4MB model, downloads in seconds and runs instantly!)
session = new_session('u2netp')

images = ['ajwa', 'medjool', 'sukkari', 'mabroom', 'safawi', 'khudri']
src_dir = r"d:\Khajoor_web\public\images"

print("Starting background removal with u2netp...", flush=True)
for name in images:
    src_path = os.path.join(src_dir, f"{name}.jpg")
    dst_path = os.path.join(src_dir, f"{name}_cutout.png")
    
    if os.path.exists(src_path):
        print(f"Processing {name}.jpg -> {name}_cutout.png...", flush=True)
        with open(src_path, 'rb') as f:
            input_data = f.read()
        output_data = remove(input_data, session=session)
        with open(dst_path, 'wb') as f:
            f.write(output_data)
        print(f"Done {name}_cutout.png!", flush=True)
    else:
        print(f"Source not found: {src_path}", flush=True)

print("All background removals completed successfully!", flush=True)

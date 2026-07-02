# =====================================================================
# Welcome to Your AI/ML Signal Processing Journey!
# This is your very first script: getting_started.py
#
# Goal: Load an image, apply a signal processing filter to reduce noise, 
# and print the results. 
# 
# Follow the comments below. Do not fear error messages; they are just
# the computer helping you learn!
# =====================================================================

# Step 1: Import the libraries we need.
# - 'cv2' is OpenCV, the industry-standard library for image & signal processing.
# - 'numpy' is the fundamental library for mathematical array operations.
import cv2
import numpy as np

def main():
    print("--- Starting Signal Processing Script ---")

    # Step 2: Create a dummy "retinal OCT scan" image using NumPy.
    # In real life, you will load a real scan, but creating one from scratch
    # is a great way to understand how digital images are represented.
    # An image is just a 2D grid (matrix) of pixels.
    # Let's create a black grid of size 300x300 pixels.
    print("Creating a simulated ocular tissue scan matrix...")
    height, width = 300, 300
    simulated_scan = np.zeros((height, width), dtype=np.uint8)

    # Step 3: Let's draw some "retinal layers" (white lines) in our black matrix.
    # We use cv2.line(image, start_point, end_point, color, thickness)
    cv2.line(simulated_scan, (0, 100), (300, 100), 255, 3) # Inner layer
    cv2.line(simulated_scan, (0, 150), (300, 150), 200, 5) # Middle layer
    cv2.line(simulated_scan, (0, 200), (300, 200), 255, 4) # Outer boundary (RPE layer)

    # Step 4: Introduce "noise" (speckle noise) to simulate a real OCT scanner.
    # In communication and signal processing, noise is represented as random values.
    print("Simulating scanner speckle noise...")
    noise = np.random.normal(0, 50, simulated_scan.shape).astype(np.int16)
    noisy_scan = np.clip(simulated_scan.astype(np.int16) + noise, 0, 255).astype(np.uint8)

    # Step 5: Apply a Digital Signal Processing (DSP) filter to clean the image!
    # We will use a Bilateral Filter. 
    # Why? Unlike a standard blur, a bilateral filter reduces noise while 
    # keeping the boundaries of our "retinal layers" sharp and clear.
    # This is exactly what you do in your AE-ResNet paper!
    print("Applying Bilateral Filter to denoise the scan...")
    # Parameters: cv2.bilateralFilter(src, diameter, sigmaColor, sigmaSpace)
    clean_scan = cv2.bilateralFilter(noisy_scan, d=9, sigmaColor=75, sigmaSpace=75)

    # Step 6: Save our three images to disk so we can see the results.
    print("Saving output images to disk...")
    cv2.imwrite("1_simulated_clean.png", simulated_scan)
    cv2.imwrite("2_simulated_noisy.png", noisy_scan)
    cv2.imwrite("3_filtered_output.png", clean_scan)

    # Step 7: Print success statistics.
    print("\n--- Success! ---")
    print(f"Original image dimensions: {width} x {height} pixels.")
    print("Saved 3 files in your workspace:")
    print("  1_simulated_clean.png -> The ideal retinal layers.")
    print("  2_simulated_noisy.png -> The scan with simulated scanner noise.")
    print("  3_filtered_output.png -> Your cleaned scan after signal processing.")
    print("-----------------------------------------")

if __name__ == "__main__":
    main()

/**
 * Compresses an image file to a target size of approximately 130KB.
 * Uses the HTML Canvas API to resize and compress the image.
 */
export async function compressImage(file: File, targetSizeKB: number = 130): Promise<File> {
    // If file is already smaller than target, return it
    if (file.size <= targetSizeKB * 1024) {
        return file
    }

    return new Promise((resolve, reject) => {
        const img = new Image()
        img.src = URL.createObjectURL(file)

        img.onload = () => {
            URL.revokeObjectURL(img.src)
            const canvas = document.createElement('canvas')
            const ctx = canvas.getContext('2d')

            if (!ctx) {
                reject(new Error('Could not get canvas context'))
                return
            }

            // Calculate new dimensions (max width/height 1920px to save initial size)
            let width = img.width
            let height = img.height
            const maxDimension = 1920

            if (width > maxDimension || height > maxDimension) {
                if (width > height) {
                    height = Math.round((height * maxDimension) / width)
                    width = maxDimension
                } else {
                    width = Math.round((width * maxDimension) / height)
                    height = maxDimension
                }
            }

            canvas.width = width
            canvas.height = height
            ctx.drawImage(img, 0, 0, width, height)

            // Iterative compression to reach target size
            // Start with quality 0.9 and decrease
            let quality = 0.9
            const attemptCompression = (q: number) => {
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error('Canvas to Blob failed'))
                            return
                        }

                        // If blob is small enough or quality is too low, return it
                        if (blob.size <= targetSizeKB * 1024 || q <= 0.5) {
                            const compressedFile = new File([blob], file.name, {
                                type: 'image/jpeg',
                                lastModified: Date.now(),
                            })
                            resolve(compressedFile)
                        } else {
                            // Recursively try lower quality
                            attemptCompression(q - 0.1)
                        }
                    },
                    'image/jpeg',
                    q
                )
            }

            attemptCompression(quality)
        }

        img.onerror = (err) => {
            URL.revokeObjectURL(img.src)
            reject(err)
        }
    })
}

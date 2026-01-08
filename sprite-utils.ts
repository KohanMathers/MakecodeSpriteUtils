/**
 * Sprite Utils Extension for MakeCode Arcade
 * Utility functions for sprite manipulation including rotation, flipping, and more
 */

//% color=#00A19B weight=100 icon="\uf0c8"
//% block="Sprite Utils"
//% groups=["Rotation", "Flip"]
//% blockGap=8
namespace spriteUtils {

    /**
     * Rotate a sprite by a specified angle in degrees
     * @param sprite the sprite to rotate
     * @param angle the angle in degrees to rotate (positive = clockwise)
     */
    //% blockId=sprite_rotate
    //% block="rotate %sprite by %angle degrees"
    //% sprite.defl=mySprite
    //% sprite.shadow=variables_get
    //% angle.min=-360 angle.max=360
    //% weight=100
    //% group="Rotation"
    //% inlineInputMode=inline
    //% blockGap=8
    export function rotate(sprite: Sprite, angle: number): void {
        if (!sprite || !sprite.image) return;

        const radians = angle * Math.PI / 180;
        sprite.setImage(rotateImage(sprite.image, radians));
    }

    /**
     * Set a sprite's absolute rotation angle
     * @param sprite the sprite to rotate
     * @param angle the absolute angle in degrees (0-360)
     */
    //% blockId=sprite_set_rotation
    //% block="set %sprite rotation to %angle degrees"
    //% sprite.defl=mySprite
    //% sprite.shadow=variables_get
    //% angle.min=0 angle.max=360
    //% weight=90
    //% group="Rotation"
    //% inlineInputMode=inline
    //% blockGap=8
    export function setRotation(sprite: Sprite, angle: number): void {
        if (!sprite || !sprite.image || !sprite.data) return;

        if (!sprite.data["__originalImage"]) {
            sprite.data["__originalImage"] = sprite.image.clone();
        }

        // Additional safety check for the original image
        if (!sprite.data["__originalImage"]) return;

        const radians = angle * Math.PI / 180;
        sprite.setImage(rotateImage(sprite.data["__originalImage"], radians));
        sprite.data["__currentRotation"] = angle;
    }

    /**
     * Get the current rotation angle of a sprite
     * @param sprite the sprite to check
     * @returns the current rotation angle in degrees
     */
    //% blockId=sprite_get_rotation
    //% block="%sprite rotation"
    //% sprite.defl=mySprite
    //% sprite.shadow=variables_get
    //% weight=80
    //% group="Rotation"
    //% blockGap=8
    export function getRotation(sprite: Sprite): number {
        if (!sprite) return 0;
        return sprite.data["__currentRotation"] || 0;
    }

    /**
     * Rotate sprite to face a specific direction
     * @param sprite the sprite to rotate
     * @param direction the direction to face (0=right, 90=down, 180=left, 270=up)
     */
    //% blockId=sprite_face_direction
    //% block="make %sprite face %direction"
    //% sprite.defl=mySprite
    //% sprite.shadow=variables_get
    //% direction.min=0 direction.max=360
    //% weight=70
    //% group="Rotation"
    //% inlineInputMode=inline
    //% blockGap=8
    export function faceDirection(sprite: Sprite, direction: number): void {
        setRotation(sprite, direction);
    }

    /**
     * Rotate sprite to face another sprite
     * @param sprite the sprite to rotate
     * @param target the sprite to face toward
     */
    //% blockId=sprite_face_sprite
    //% block="make %sprite face toward %target"
    //% sprite.defl=mySprite
    //% sprite.shadow=variables_get
    //% target.defl=otherSprite
    //% target.shadow=variables_get
    //% weight=60
    //% group="Rotation"
    //% inlineInputMode=inline
    //% blockGap=8
    export function faceToward(sprite: Sprite, target: Sprite): void {
        if (!sprite || !target) return;
        
        const dx = target.x - sprite.x;
        const dy = target.y - sprite.y;
        const angle = Math.atan2(dy, dx) * 180 / Math.PI;
        
        setRotation(sprite, angle);
    }

    /**
     * Smoothly rotate sprite over time
     * @param sprite the sprite to rotate
     * @param angle the angle to rotate by in degrees
     * @param duration the time in milliseconds
     */
    //% blockId=sprite_smooth_rotate
    //% block="smoothly rotate %sprite by %angle degrees over %duration ms"
    //% sprite.defl=mySprite
    //% sprite.shadow=variables_get
    //% angle.min=-360 angle.max=360
    //% duration.min=0 duration.max=5000
    //% weight=50
    //% group="Rotation"
    //% inlineInputMode=inline
    //% blockGap=8
    export function smoothRotate(sprite: Sprite, angle: number, duration: number): void {
        if (!sprite) return;

        // Prevent overlapping animations on the same sprite
        if (sprite.data["__isRotating"]) return;

        sprite.data["__isRotating"] = true;
        const startRotation = getRotation(sprite);
        const steps = Math.max(1, Math.floor(duration / 50));
        const stepDuration = duration / steps;

        control.runInParallel(function() {
            for (let i = 0; i <= steps; i++) {
                const progress = i / steps;
                const currentAngle = startRotation + (angle * progress);

                if (sprite) {
                    setRotation(sprite, currentAngle);
                }

                if (i < steps) {
                    pause(stepDuration);
                }
            }

            if (sprite) {
                sprite.data["__isRotating"] = false;
            }
        });
    }

    /**
     * Reset sprite rotation to original orientation
     * @param sprite the sprite to reset
     */
    //% blockId=sprite_reset_rotation
    //% block="reset %sprite rotation"
    //% sprite.defl=mySprite
    //% sprite.shadow=variables_get
    //% weight=40
    //% group="Rotation"
    //% blockGap=8
    export function resetRotation(sprite: Sprite): void {
        if (!sprite) return;

        if (sprite.data["__originalImage"]) {
            sprite.setImage(sprite.data["__originalImage"].clone());
            sprite.data["__currentRotation"] = 0;
        }
    }

    /**
     * Rotate sprite exactly 90 degrees clockwise (optimized for perfect quality)
     * @param sprite the sprite to rotate
     */
    //% blockId=sprite_rotate_90
    //% block="rotate %sprite 90 degrees clockwise"
    //% sprite.defl=mySprite
    //% sprite.shadow=variables_get
    //% weight=35
    //% group="Rotation"
    //% blockGap=8
    export function rotate90(sprite: Sprite): void {
        if (!sprite || !sprite.image) return;

        if (!sprite.data["__originalImage"]) {
            sprite.data["__originalImage"] = sprite.image.clone();
        }

        const currentRotation = sprite.data["__currentRotation"] || 0;
        const newRotation = (currentRotation + 90) % 360;

        // For 90-degree increments, use transpose and flip for perfect quality
        const rotated = rotate90Degrees(sprite.data["__originalImage"], newRotation);
        sprite.setImage(rotated);
        sprite.data["__currentRotation"] = newRotation;
    }

    /**
     * Flip sprite horizontally
     * @param sprite the sprite to flip
     */
    //% blockId=sprite_flip_horizontal
    //% block="flip %sprite horizontally"
    //% sprite.defl=mySprite
    //% sprite.shadow=variables_get
    //% weight=30
    //% group="Flip"
    //% blockGap=8
    export function flipHorizontal(sprite: Sprite): void {
        if (!sprite || !sprite.image) return;
        sprite.image.flipX();
    }

    /**
     * Flip sprite vertically
     * @param sprite the sprite to flip
     */
    //% blockId=sprite_flip_vertical
    //% block="flip %sprite vertically"
    //% sprite.defl=mySprite
    //% sprite.shadow=variables_get
    //% weight=20
    //% group="Flip"
    //% blockGap=8
    export function flipVertical(sprite: Sprite): void {
        if (!sprite || !sprite.image) return;
        sprite.image.flipY();
    }

    /**
     * Internal function to rotate an image by 90-degree increments (perfect quality)
     */
    function rotate90Degrees(img: any, totalDegrees: number) {
        const degrees = ((totalDegrees % 360) + 360) % 360;
        const times = Math.floor(degrees / 90);
        let result = img.clone();
        for (let i = 0; i < times; i++) {
            result = rotate90Once(result);
        }
        return result;
    }

    /**
     * Rotate image exactly 90 degrees clockwise with perfect quality
     */
    function rotate90Once(img: any) {
        const width = img.width;
        const height = img.height;
        const rotated = image.create(height, width);
        for (let y = 0; y < height; y++) {
            for (let x = 0; x < width; x++) {
                rotated.setPixel(height - 1 - y, x, img.getPixel(x, y));
            }
        }
        return rotated;
    }

    /**
     * Internal function to rotate an image by arbitrary angles
     */
    function rotateImage(img: any, radians: number) {
        const cos = Math.cos(radians);
        const sin = Math.sin(radians);
        
        const width = img.width;
        const height = img.height;
        
        const newWidth = Math.ceil(Math.abs(width * cos) + Math.abs(height * sin));
        const newHeight = Math.ceil(Math.abs(width * sin) + Math.abs(height * cos));
        
        const rotated = image.create(newWidth, newHeight);
        
        const centerX = width / 2;
        const centerY = height / 2;
        const newCenterX = newWidth / 2;
        const newCenterY = newHeight / 2;
        
        for (let y = 0; y < newHeight; y++) {
            for (let x = 0; x < newWidth; x++) {
                const tx = x - newCenterX;
                const ty = y - newCenterY;
                
                const srcX = Math.round(tx * cos + ty * sin + centerX);
                const srcY = Math.round(-tx * sin + ty * cos + centerY);
                
                if (srcX >= 0 && srcX < width && srcY >= 0 && srcY < height) {
                    rotated.setPixel(x, y, img.getPixel(srcX, srcY));
                }
            }
        }
        
        return rotated;
    }
}
# Sprite Utils

Utility functions for sprite manipulation in MakeCode Arcade.

## Features

This extension provides sprite utilities in five groups:

### Rotation
- Rotate by relative angle
- Set/get/reset absolute rotation
- Face a specific direction
- Face toward another sprite
- Smooth rotation over time

### Transform
- Flip horizontally
- Flip vertically

### Effects
- Set sprite opacity/transparency (dithered simulation)
- Recolor one palette index to another
- Add a 1px outline around opaque pixels

### Movement
- Get distance between two sprites
- Get angle from one sprite to another
- Move sprite forward by current rotation angle
- Orbit sprite around a point over time

### Image
- Clone a sprite's current image to another sprite
- Stamp sprite image to background at current position
- Crop transparent borders from sprite image

## Usage

### Import the Extension

1. Open your MakeCode Arcade project
2. Click **Extensions** (under Advanced)
3. Enter the URL of this repository
4. The **Sprite Utils** category appears in the toolbox

## API Examples

```typescript
let mySprite = sprites.create(img`...`, SpriteKind.Player)
let other = sprites.create(img`...`, SpriteKind.Enemy)

// Rotation
spriteUtils.rotate(mySprite, 45)
spriteUtils.setRotation(mySprite, 90)
let rot = spriteUtils.rotation(mySprite)
spriteUtils.resetRotation(mySprite)
spriteUtils.faceDirection(mySprite, 270)
spriteUtils.faceToward(mySprite, other)
spriteUtils.smoothRotate(mySprite, 180, 1000)

// Transform
spriteUtils.flipHorizontal(mySprite)
spriteUtils.flipVertical(mySprite)

// Effects
spriteUtils.setOpacity(mySprite, 60)
spriteUtils.recolor(mySprite, 2, 9)
spriteUtils.outline(mySprite, 1)

// Movement
let d = spriteUtils.distanceBetween(mySprite, other)
let a = spriteUtils.angleBetween(mySprite, other)
spriteUtils.moveForward(mySprite, 12)
spriteUtils.orbitAroundPoint(mySprite, 80, 60, 30, 90, 2000)

// Image
spriteUtils.cloneSpriteImage(mySprite, other)
spriteUtils.stampToBackground(mySprite)
spriteUtils.cropTransparentBorder(mySprite)
```

## Block Category

- Category name: **Sprite Utils**
- Category color: `#00A19B`

## Notes

- Angles are degrees (not radians)
- Positive angles rotate clockwise
- Opacity is simulated with dithering (Arcade images do not support true per-pixel alpha)
- Rotation/effect operations preserve an internal base image for consistent chaining

## License

MIT

## Support

For issues or feature requests, open an issue on the repository.

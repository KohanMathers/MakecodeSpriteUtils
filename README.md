# sprite-fx

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
4. The **Sprite FX** category appears in the toolbox

## API Examples

```typescript
let mySprite = sprites.create(img`...`, SpriteKind.Player)
let other = sprites.create(img`...`, SpriteKind.Enemy)

// Rotation
spriteFx.rotate(mySprite, 45)
spriteFx.setRotation(mySprite, 90)
let rot = spriteFx.rotation(mySprite)
spriteFx.resetRotation(mySprite)
spriteFx.faceDirection(mySprite, 270)
spriteFx.faceToward(mySprite, other)
spriteFx.smoothRotate(mySprite, 180, 1000)

// Transform
spriteFx.flipHorizontal(mySprite)
spriteFx.flipVertical(mySprite)

// Effects
spriteFx.setOpacity(mySprite, 60)
spriteFx.recolor(mySprite, 2, 9)
spriteFx.outline(mySprite, 1)

// Movement
let d = spriteFx.distanceBetween(mySprite, other)
let a = spriteFx.angleBetween(mySprite, other)
spriteFx.moveForward(mySprite, 12)
spriteFx.orbitAroundPoint(mySprite, 80, 60, 30, 90, 2000)

// Image
spriteFx.cloneSpriteImage(mySprite, other)
spriteFx.stampToBackground(mySprite)
spriteFx.cropTransparentBorder(mySprite)
```

## Block Category

- Category name: **Sprite FX**
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

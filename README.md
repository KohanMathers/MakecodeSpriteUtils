# Sprite Utils

Utility functions for sprite manipulation in MakeCode Arcade.

## Features

This extension provides comprehensive sprite manipulation utilities:

### Rotation
- **Basic Rotation**: Rotate sprites by any angle
- **Absolute Rotation**: Set sprites to specific angles
- **Face Direction**: Make sprites point in specific directions
- **Face Toward**: Make sprites face other sprites
- **Smooth Rotation**: Animate rotation over time
- **Rotation Tracking**: Get current rotation angle

### Transformation
- **Flip Functions**: Horizontal and vertical flipping

## Usage

### Import the Extension

1. Go to your MakeCode Arcade project
2. Click on **Extensions** (under Advanced)
3. Enter the URL of this repository
4. The "Sprite Utils" category will appear in your toolbox

### Basic Examples

#### Rotate a Sprite

```typescript
let mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . 2 2 2 2 2 2 2 2 2 2
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)

// Rotate by 45 degrees clockwise
spriteUtils.rotate(mySprite, 45)
```

#### Set Absolute Rotation

```typescript
// Set sprite to face downward (90 degrees)
spriteUtils.setRotation(mySprite, 90)

// Check current rotation
let currentAngle = spriteUtils.getRotation(mySprite)
```

#### Face Another Sprite

```typescript
let player = sprites.create(img`...`, SpriteKind.Player)
let enemy = sprites.create(img`...`, SpriteKind.Enemy)

// Make enemy face the player
spriteUtils.faceToward(enemy, player)
```

#### Smooth Rotation Animation

```typescript
// Rotate 180 degrees over 1 second (1000ms)
spriteUtils.smoothRotate(mySprite, 180, 1000)
```

#### Face Specific Direction

```typescript
// 0 = right, 90 = down, 180 = left, 270 = up
spriteUtils.faceDirection(mySprite, 270) // Face up
```

#### Flip Sprites

```typescript
spriteUtils.flipHorizontal(mySprite)
spriteUtils.flipVertical(mySprite)
```

#### Reset Rotation

```typescript
// Return sprite to original orientation
spriteUtils.resetRotation(mySprite)
```

## Advanced Example: Rotating Turret

```typescript
let turret = sprites.create(img`
    . . . . . . . 2 2 . . . . . . .
    . . . . . . . 2 2 . . . . . . .
    . . . . . . . 2 2 . . . . . . .
    . . . . . . . 2 2 . . . . . . .
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
    2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
`, SpriteKind.Player)

let target = sprites.create(img`
    . . . . 2 2 2 2 2 2 . . . .
    . . . 2 5 5 5 5 5 5 2 . . .
    . . 2 5 5 5 5 5 5 5 5 2 . .
    . 2 5 5 5 5 5 5 5 5 5 5 2 .
    2 5 5 5 5 5 5 5 5 5 5 5 5 2
    2 5 5 5 5 5 5 5 5 5 5 5 5 2
    2 5 5 5 5 5 5 5 5 5 5 5 5 2
    2 5 5 5 5 5 5 5 5 5 5 5 5 2
    2 5 5 5 5 5 5 5 5 5 5 5 5 2
    . 2 5 5 5 5 5 5 5 5 5 5 2 .
    . . 2 5 5 5 5 5 5 5 5 2 . .
    . . . 2 5 5 5 5 5 5 2 . . .
    . . . . 2 2 2 2 2 2 . . . .
`, SpriteKind.Enemy)

controller.moveSprite(target)

game.onUpdateInterval(100, function() {
    spriteUtils.faceToward(turret, target)
})
```

## Block Categories

All blocks are found under the **Sprite Utils** category in the toolbox.

## Notes

- Rotation angles are in degrees (not radians)
- Positive angles rotate clockwise
- The extension preserves the original sprite image for accurate rotation
- Smooth rotation creates timed updates for animation

## License

MIT

## Support

For issues or feature requests, please file an issue on the repository.
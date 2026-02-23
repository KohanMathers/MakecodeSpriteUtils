let a = sprites.create(img`
    . . . . .
    . . 2 . .
    2 2 2 2 2
    . . 2 . .
    . . . . .
`, SpriteKind.Player)

let b = sprites.create(img`
    . 5 5 5 .
    5 5 5 5 5
    5 5 5 5 5
    5 5 5 5 5
    . 5 5 5 .
`, SpriteKind.Enemy)

spriteFx.rotate(a, 45)
spriteFx.setRotation(a, 90)
spriteFx.rotation(a)
spriteFx.faceDirection(a, 45)
spriteFx.faceToward(a, b)
spriteFx.flipHorizontal(a)
spriteFx.flipVertical(a)
spriteFx.smoothRotate(a, 180, 500)
spriteFx.resetRotation(a)
spriteFx.setOpacity(a, 60)
spriteFx.recolor(a, 2, 9)
spriteFx.outline(a, 1)

let distance = spriteFx.distanceBetween(a, b)
let angle = spriteFx.angleBetween(a, b)
spriteFx.setRotation(a, angle)
spriteFx.moveForward(a, distance / 4)

spriteFx.orbitAroundPoint(b, 80, 60, 25, 90, 1000)
spriteFx.cloneSpriteImage(a, b)
spriteFx.stampToBackground(a)
spriteFx.cropTransparentBorder(a)

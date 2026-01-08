// Test file for sprite rotation extension

// Create a test sprite (arrow pointing right)
let testSprite = sprites.create(img`
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . 2 2 . . . . . . .
    . . . . . . . 2 2 2 . . . . . .
    . . . . . . . 2 2 2 2 . . . . .
    2 2 2 2 2 2 2 2 2 2 2 2 . . . .
    2 2 2 2 2 2 2 2 2 2 2 2 . . . .
    . . . . . . . 2 2 2 2 . . . . .
    . . . . . . . 2 2 2 . . . . . .
    . . . . . . . 2 2 . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
    . . . . . . . . . . . . . . . .
`, SpriteKind.Player)

testSprite.setPosition(80, 60)

// Test 1: Basic rotation
controller.A.onEvent(ControllerButtonEvent.Pressed, function() {
    spriteRotation.rotate(testSprite, 45)
})

// Test 2: Set absolute rotation
controller.B.onEvent(ControllerButtonEvent.Pressed, function() {
    spriteRotation.setRotation(testSprite, 90)
})

// Test 3: Reset rotation
controller.menu.onEvent(ControllerButtonEvent.Pressed, function() {
    spriteRotation.resetRotation(testSprite)
})

// Test 4: Smooth rotation
let rotationAmount = 0
game.onUpdateInterval(2000, function() {
    rotationAmount += 90
    spriteRotation.smoothRotate(testSprite, 90, 1000)
})
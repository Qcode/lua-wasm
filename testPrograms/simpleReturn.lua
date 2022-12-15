-- Early return to leave a function

local function guessTheNum(x)
    local theNum = 10
    if (x < theNum) then
        print("Too low! Guess higher")
        return
    elseif (x > theNum) then
        print("Too high! Guess lower")
        return
    end
    print("You guessed it!")
end

guessTheNum(1)
guessTheNum(-5)
guessTheNum(100)
guessTheNum(10)

-- This time with a function and a for loop

local function sumNumbers(n)
    local sum = 0
    for x = 1, n do
        sum = sum + x
    end
    print(sum)
end

sumNumbers(77)

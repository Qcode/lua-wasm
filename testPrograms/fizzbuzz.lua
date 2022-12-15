--FizzBuzz, a classic example
-- Done via string concatenation

for x = 1, 100 do
    local result = ""
    if ( x % 3 ~= 0 and x % 5 ~= 0) then
        -- This case needs to be handled separately, since unfortunately
        -- I didn't have time for int -> string conversions
        print(x)
    else
        if (x%3 == 0) then
            result = result .. "Fizz"
        end
        if (x%5 == 0) then
            result = result .. "Buzz"
        end
        print(result)
    end
end

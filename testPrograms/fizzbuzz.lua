local x = 0

while (x < 100) do
    x = x + 1
    if x % 5 == 0 then
        if x % 3 == 0 then
            print("FizzBuzz")
        else
            print("Buzz")
        end
    elseif x % 3 == 0 then
        print("Fizz")
    else
        print(x)
    end
end

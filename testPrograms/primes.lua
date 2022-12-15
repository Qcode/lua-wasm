-- An example designed to trigger the garbage collector a number of times, and demonstrate
-- many of the language features

-- If you inspect via console.log, you'll see "swapping" printed 4 times

function checkPrime(n)
    for i = 2, n-1 do
        if (n % i == 0) then
            return false
        end
    end
    return true
end

local primeTable = {}
local primeCount = 0
local findPrimesUpTo = 1000

for i = 2, findPrimesUpTo do
    if (checkPrime(i)) then
        primeCount = primeCount + 1
        primeTable[primeCount] = i
    end
end

print("I found")
print(primeCount)
print("primes. They were: ")
for i, v in ipairs(primeTable) do
    print("Prime number")
    print(i)
    print("is")
    print(v)
end

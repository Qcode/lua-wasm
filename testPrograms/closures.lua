local z = 1
local x = 2

local function f(x, y)
    local x = 5
    local z = z
    print(x)
    print(y)
    print(z)
    local function h()
        print(x)
        print(y)
        print(z)
        local z = 2
        print(x)
        print(y)
        print(z)
    end
    local function g()
        print(x)
        print(y)
        print(z)
        h()
        print(x)
        print(y)
        print(z)
    end
    print(x)
    print(y)
    print(z)
    g()
    print(x)
    print(y)
    print(z)
end

f(3, 4)

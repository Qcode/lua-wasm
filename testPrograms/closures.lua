local z = 1
local x = 2

local function f(x, y)
    local x = 5
    local z = z
    local function h()
        local z = 2
        print("hello")
    end
    local function g()
        h()
    end
end

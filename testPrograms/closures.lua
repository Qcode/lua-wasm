local z = 1
local x = 2

function f(x, y)
    local x = 5
    local z = z
    function h()
        local z = 2
        print("hello")
    end
    function g()
        h()
    end
end

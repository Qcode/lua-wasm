-- Taken from lua official tests

local Z = function (le)
    local function a (f)
      return le(function (x) return f(f)(x) end)
    end
    return a(a)
end

local F = function (f)
    return function (n)
        if n == 0 then return 1
        else return n*f(n-1) end
    end
end

local fact = Z(F)

local result = fact(5)
print(result)

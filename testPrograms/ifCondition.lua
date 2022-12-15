-- Simple tests of if statements

local var1 = true
local var2 = false

if (var1 and var2) then
    print("Var 1 and var 2")
elseif (var1 and not var2) then
    print("Var 1 and not var 2")
else
    print("Neither")
end

if (var1 or var2) then
    print(var1 or var2)
end

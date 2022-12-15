-- Repeat loops exist, translated to whiles at the AST level

local a = 1

repeat
    print("value of a")
    print(a)
    a = a + 1
until a > 9

print("done loop")

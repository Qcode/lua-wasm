-- This is an example of Lua's iterator syntax
-- Used most commonly in the case of ipairs for looping through a table
-- Translated into a while loop at the AST level

local iterator = function(limit, currentval)
	return currentval < limit and currentval + 1 or nil
end

for i in iterator, 10, 0 do
	print(i)
end

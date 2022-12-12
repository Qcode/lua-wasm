local iterator = function(limit, currentval)
	return currentval < limit and currentval + 1 or nil
end

for i in iterator, 10, 0 do
	print(i)
end	

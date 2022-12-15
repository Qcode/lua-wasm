-- We only have 64 kbs of memory, so 100,000 function calls is sure to call
-- garbage collection at least a few times

for i = 1, 100000 do
	print(i)
end

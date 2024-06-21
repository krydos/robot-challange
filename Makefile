.PHONY: big-file
big-file:
	echo "PLACE 0,0,EAST" > ./tests/data/big.txt; \
	yes "MOVE" | head -n 50000000 >> ./tests/data/big.txt; \
	echo "REPORT" >> ./tests/data/big.txt;

SRC=$1
DEST=$2
gifsicle --resize 200x150 --colors 128 $SRC > $DEST

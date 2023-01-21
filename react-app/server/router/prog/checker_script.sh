cd $(dirname $0)

f1="output.txt"
f2="expected_output.txt"

perl -0pi -e "s/\R*\z//g" $f1
perl -0pi -e "s/\R*\z//g" $f2

# f1="$(echo -e "${{$f1}}" | sed -i 's/[[:space:]]*$//')"

# echo -n "output = "
# cat $f1
# echo "_"

cmp -s $f1 $f2 && echo "AC" || echo "WA"

# $SHELL
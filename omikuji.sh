declare -a random=($(($RANDOM % 10 )))

case "$random" in
    "0" ) echo "大吉  ";;
    "1" ) echo "大吉  ";;
    "2" ) echo "吉  ";;
    "3" ) echo "吉  ";;
    "4" ) echo "小吉  ";;
    "5" ) echo "小吉  ";;
    "6" ) echo "末吉  ";;
    "7" ) echo "末吉  ";;
    "8" ) echo "吉  ";;
    "9" ) echo "吉  ";;
    "10" ) echo "大吉  ";;
esac

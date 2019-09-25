#!/bin/bash

declare -a random=($(($RANDOM % 100 )))

if [ $random -lt 17 ] ; then
  fortune='大吉'
elif [ $random -lt 52 ] ; then
  fortune='吉'
elif [ $random -lt 57 ] ; then
  fortune='半吉'
elif [ $random -lt 61 ] ; then
  fortune='小吉'
elif [ $random -lt 64 ] ; then
  fortune='末小吉'
elif [ $random -lt 70 ] ; then
  fortune='末吉'
elif [ $random -lt 100 ] ; then
  fortune='凶'
else
  fortune='平'
fi

today=$(date "+%Y-%m-%d")
echo "- $today $fortune"

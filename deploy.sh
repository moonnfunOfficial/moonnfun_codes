#!/bin/bash

rm -f build.zip
zip -r build.zip build

if [[ "$1" == "dapp" ]]; then
    sudo scp -r -i /Users/Mr.Li/.ssh/id_rsa ./build.zip root@13.213.129.57:/root
elif [[ "$1" == "web-main" ]]; then
    sudo scp -r -i /Users/Mr.Li/.ssh/id_rsa ./build.zip root@54.251.132.115:/root
elif [[ "$1" == "web-test" ]]; then
    sudo scp -r -i /Users/Mr.Li/.ssh/id_rsa ./build.zip root@13.229.252.182:/root
fi
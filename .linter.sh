#!/bin/bash
cd /home/kavia/workspace/code-generation/kollywood-quizmaster-38611-9e069edb/kollywood_quizmaster
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi


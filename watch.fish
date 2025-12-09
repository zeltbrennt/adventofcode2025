#!/bin/fish 

ls solutions/*.ts | entr -cp bun run /_

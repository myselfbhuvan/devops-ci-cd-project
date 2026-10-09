from node:20
workdir /calculator
copy calculator.html .
copy server.js .
expose 5000
CMD ["node","server.js"]

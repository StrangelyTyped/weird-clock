var fs = require("fs"),
  PNG = require("pngjs").PNG;


fs.createReadStream(process.argv[2])
  .pipe(
    new PNG({
      filterType: 4,
    })
  )
  .on("parsed", function () {
	  let i = 0;
	  let str = "static const unsigned char PROGMEM logo_bmp[] = { B";
    for (var y = 0; y < this.height; y++) {
      for (var x = 0; x < this.width; x++) {
        var idx = (this.width * y + x) << 2;
 	if(i !== 0 && (i % 8) === 0){
		str += ",B";
	}
	i++;
	str += (this.data[idx] > 128 ? "1" : "0");
      }
    }
	  str += " };";
	  console.log(str);
  });

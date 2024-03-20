const { app } = require("../../app");
const dbConfig = require("../../config/db/index")

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  define: {
    timestamps: false
  },
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  },
  logging: false
})

const db = {};

  // sequelize.sync({ force: true })
  //   .then((result) => {
  //     db.account.bulkCreate([
  //       {
  //         "id_acc": 1,
  //         "username_acc": "iamadmin1",
  //         "password_acc": "112233",
  //         "role_acc": "admin",
  //         "avatar_acc": "avatar_default.jpg"
  //       },
  //       {
  //         "id_acc": 2,
  //         "username_acc": "iamadmin2",
  //         "password_acc": "112233",
  //         "role_acc": "admin",
  //         "avatar_acc": "avatar_default.jpg"
  //       },
  //       {
  //         "id_acc": 3,
  //         "username_acc": "iamuser1",
  //         "password_acc": "112233",
  //         "role_acc": "customer",
  //         "avatar_acc": "avatar_default.jpg"
  //       },
  //       {
  //         "id_acc": 4,
  //         "username_acc": "iamuser2",
  //         "password_acc": "112233",
  //         "role_acc": "customer",
  //         "avatar_acc": "avatar_default.jpg"
  //       }
  //     ])
  //       .then((result) => {
  //         db.staff.bulkCreate([
  //           {
  //             "id_staff": 1,
  //             "name_staff": "Khang",
  //             "address_staff": "CM",
  //             "phone_staff": "0123213",
  //             "email_staff": "sdfjkasdf",
  //             "date_of_birth_staff": "2016-11-02",
  //             "id_acc": 1,
  //             "account": {
  //               "id_acc": 1,
  //               "username_acc": "iamadmin1",
  //               "password_acc": "112233",
  //               "role_acc": "admin",
  //               "avatar_acc": "admin.jpg"
  //             }
  //           },
  //           {
  //             "id_staff": 2,
  //             "name_staff": "Khang2",
  //             "address_staff": "CM",
  //             "phone_staff": "123123123",
  //             "email_staff": "asdfas",
  //             "date_of_birth_staff": "2002-11-16",
  //             "id_acc": 2,
  //             "account": {
  //               "id_acc": 2,
  //               "username_acc": "iamadmin2",
  //               "password_acc": "112233",
  //               "role_acc": "admin",
  //               "avatar_acc": "admin.jpg"
  //             }
  //           }
  //         ])
  //       })
  //     db.brand.bulkCreate([
  //       {
  //         "id_brand": 3,
  //         "name_brand": "Rolex",
  //         "description_brand": "Rolex là một trong các hãng đồng hồ nổi tiếng và cao cấp nhất trên thế giới. Hơn 100 năm hình thành và phát triển, Rolex được tín đồ thời trang tin tưởng lựa chọn bởi thiết kế sang trọng, góp phần định hình phong cách riêng cho người sử dụng.",
  //         "logo_brand": "rolex.png"
  //       },
  //       {
  //         "id_brand": 4,
  //         "name_brand": "Cartier",
  //         "description_brand": "Tiếp theo trong danh sách các hãng đồng hồ cao cấp được ưa chuộng hiện nay là thương hiệu đồng hồ Cartier đến từ Thụy Sĩ. Theo đó, đồng hồ Cartier tạo ấn tượng với người dùng bởi thiết kế sang trọng, quý phái và được chế tác tinh xảo trên từng chi tiết.",
  //         "logo_brand": "cartier.png"
  //       },
  //       {
  //         "id_brand": 5,
  //         "name_brand": "Audemars Piguet",
  //         "description_brand": "Trong danh sách các hãng đồng hồ nổi tiếng nhất hiện nay, không thể không nhắc đến Audemars Piguet. Đây là thương hiệu chuyên cung cấp đồng hồ cơ khí cao cấp cho hơn 88 quốc gia và trở thành tượng đài của ngành công nghiệp đồng hồ.",
  //         "logo_brand": "audemars_piguet.png"
  //       },
  //       {
  //         "id_brand": 6,
  //         "name_brand": "Patek Philippe",
  //         "description_brand": "Là thương hiệu đi đầu trong ngành công nghiệp “cổ máy thời gian”, đồng hồ Patek Philippe đến từ Thụy Sĩ tạo ấn tượng mạnh mẽ với người dùng, bởi thiết kế tinh xảo, sang trọng và có độ chính xác cực kỳ cao. ",
  //         "logo_brand": "patek_philippe.png"
  //       },
  //       {
  //         "id_brand": 7,
  //         "name_brand": "Jaeger-LeCoultre",
  //         "description_brand": "Hiện nay trên thị trường, đồng hồ Jaeger-LeCoultre được xem là tượng đài cao nhất của giới đồng hồ. Thương hiệu mang đến cho khách hàng mẫu đồng hồ có nét đẹp nghệ thuật đặc biệt, cùng với bộ máy nhỏ và phức tạp nhất thế giới.",
  //         "logo_brand": "Jaeger_leCoultre.png"
  //       },
  //       {
  //         "id_brand": 8,
  //         "name_brand": "Calvin Klein",
  //         "description_brand": "Có mặt trong danh sách các hãng đồng hồ nổi tiếng, đẳng cấp trên thế giới không thể thiếu Calvin Klein - “ông hàng thời trang nước Mỹ”. Thương hiệu đã tạo dấu ấn bằng cách kết hợp hoàn hảo giữa thiết kế thời thượng, cùng với bộ máy đạt chuẩn Swiss Made trong từng chiếc đồng hồ.",
  //         "logo_brand": "calvin_klein.png"
  //       },
  //       {
  //         "id_brand": 9,
  //         "name_brand": "Longines",
  //         "description_brand": "Là hãng đồng hồ Thụy Sĩ danh tiếng và lâu đời nhất, Longines nổi bật với thiết kế sang trọng, đẳng cấp nhưng vẫn giữ được nét cổ điển đậm nét châu Âu. Mẫu mã đồng hồ nhà Longines mang lại sự trang nhã, lịch thiệp cho người đeo nên thu hút rất nhiều tín đồ mê đồng hồ.",
  //         "logo_brand": "longines.svg"
  //       },
  //       {
  //         "id_brand": 10,
  //         "name_brand": "Mido",
  //         "description_brand": "Là một trong các hãng đồng hồ nổi tiếng, xa xỉ bậc nhất trên thế giới, Mido luôn luôn cải tiến chất lượng mẫu mã để mang đến cho khách hàng sản phẩm có độ bền bỉ, chính xác và thiết kế sang trọng, toát lên sự đẳng cấp vốn có. ",
  //         "logo_brand": "Mido_logo.svg.png"
  //       },
  //       {
  //         "id_brand": 11,
  //         "name_brand": "Timex",
  //         "description_brand": "Ngoài các hãng đồng hồ nổi tiếng đến từ Thụy Sĩ thì đại diện từ Mỹ - Timex được xem là “giai điệu” hoàn toàn mới. Timex đã chinh phục khách hàng nhờ có thiết kế độc đáo, chất lượng bền bỉ cùng với mức giá tầm trung hợp lý. Vì vậy, đây cũng là lựa chọn hàng đầu của “cánh mày râu” hiện nay. ",
  //         "logo_brand": "timex.png"
  //       },
  //       {
  //         "id_brand": 12,
  //         "name_brand": "Ogival",
  //         "description_brand": "Ogival là thương hiệu đồng hồ lâu đời của Thụy Sĩ, nổi bật với chất liệu và tính nghệ thuật trong từng mẫu mã. Nếu bạn yêu thích mẫu đồng hồ mang hơi thở Á Đông thì Ogival là lựa chọn không thể bỏ qua.",
  //         "logo_brand": "ogival.png"
  //       }
  //     ])
  //     .then((result) => {
  //       db.product.bulkCreate([
  //         {
  //             "id_prd": 9,
  //             "name_prd": "COSMOGRAPH DAYTONA",
  //             "price_prd": 9500,
  //             "size_prd": 41,
  //             "quantity_prd": 62,
  //             "gender_prd": 0,
  //             "description_prd": "Oyster, 40 mm, platinum",
  //             "main_img_prd": "efd1a9c8-7494-11ee-b962-0242ac120002.png",
  //             "id_brand": 3
  //         },
  //         {
  //             "id_prd": 10,
  //             "name_prd": "AIR-KING",
  //             "price_prd": 8100,
  //             "size_prd": 45,
  //             "quantity_prd": 6,
  //             "gender_prd": 0,
  //             "description_prd": "The Air-King dial features a distinctive black dial with a combination of large 3, 6 and 9 numerals marking the hours and a prominent minute scale for navigational time readings. It bears the name Air-King in the same lettering that was designed specially for the model in the 1950s.",
  //             "main_img_prd": "5fa2c318-7495-11ee-b962-0242ac120002.png",
  //             "id_brand": 3
  //         },
  //         {
  //             "id_prd": 15,
  //             "name_prd": "DATEJUST",
  //             "price_prd": 11000,
  //             "size_prd": 31,
  //             "quantity_prd": 10,
  //             "gender_prd": 0,
  //             "description_prd": "Oyster, 31 mm, Oystersteel and white gold",
  //             "main_img_prd": "m278274-0035_modelpage_front_facing_landscape.png",
  //             "id_brand": 3
  //       },
  //         {
  //             "id_prd": 16,
  //             "name_prd": "DAY-DATE",
  //             "price_prd": 63584,
  //             "size_prd": 36,
  //             "quantity_prd": 10,
  //             "gender_prd": 0,
  //             "description_prd": "Oyster, 36 mm, yellow gold and diamonds",
  //             "main_img_prd": "m128348rbr-0049_modelpage_front_facing_landscape.png",
  //             "id_brand": 3,
  //         },
  //         {
  //             "id_prd": 17,
  //             "name_prd": "GMT-MASTER II",
  //             "price_prd": 17826,
  //             "size_prd": 40,
  //             "quantity_prd": 10,
  //             "gender_prd": 0,
  //             "description_prd": "Oyster, 40 mm, Oystersteel and yellow gold",
  //             "main_img_prd": "m126713grnr-0001_modelpage_front_facing_landscape.png",
  //             "id_brand": 3,
  //         },
  //         {
  //             "id_prd": 18,
  //             "name_prd": "LADY-DATEJUST",
  //             "price_prd": 45417,
  //             "size_prd": 28,
  //             "quantity_prd": 19,
  //             "gender_prd": 1,
  //             "description_prd": "Oyster, 28 mm, Everose gold and diamonds",
  //             "main_img_prd": "m279135rbr-0001_modelpage_front_facing_landscape.png",
  //             "id_brand": 3,
  //         },
  //         {
  //             "id_prd": 19,
  //             "name_prd": "OYSTER PERPETUAL",
  //             "price_prd": 6585,
  //             "size_prd": 28,
  //             "quantity_prd": 10,
  //             "gender_prd": 1,
  //             "description_prd": "Oyster, 36 mm, Oysterstee",
  //             "main_img_prd": "m126000-0009_modelpage_front_facing_landscape.png",
  //             "id_brand": 3,
  //         },
  //         {
  //             "id_prd": 20,
  //             "name_prd": "TANK FRANÇAISE WATCH",
  //             "price_prd": 3700,
  //             "size_prd": 28,
  //             "quantity_prd": 4,
  //             "gender_prd": 1,
  //             "description_prd": "Tank Française watch, small model, quartz movement. Steel case. Faceted crown in steel decorated with a synthetic cabochon-shaped spinel. Silvered sunray dial, blued-steel sword-shaped hands, sapphire crystal. Steel bracelet. Case dimensions: 25.7 mm x 21.2 mm, thickness: 6.8 mm. Water-resistant up to 3 bar (approx. 30 meters/100 feet)",
  //             "main_img_prd": "96cf7f36e984550bb090ecb21ef55da0.avif",
  //             "id_brand": 4,
  //         },
  //         {
  //             "id_prd": 21,
  //             "name_prd": "SANTOS DE CARTIER WATCH",
  //             "price_prd": 7750,
  //             "size_prd": 40,
  //             "quantity_prd": 5,
  //             "gender_prd": 0,
  //             "description_prd": "Santos de Cartier watch, large model, mechanical movement with automatic winding 1847 MC. Steel case, 7-sided crown set with a synthetic faceted blue spinel, graduated green dial, polished steel sword-shaped hands with luminescent material, sapphire crystal. Steel bracelet with SmartLink adjustment system. Second strap in green alligator skin, with interchangeable steel folding buckle. Both are fitted with the QuickSwitch interchangeable system. Case width: 39.8 mm, thickness: 9.38 mm. Water-resistant up to 10 bar (approx. 100 meters/330 feet).",
  //             "main_img_prd": "24768097034d5807a5060c2ffcbbdefa.avif",
  //             "id_brand": 4,
  //         },
  //         {
  //             "id_prd": 22,
  //             "name_prd": "BALLON BLEU DE CARTIER WATCH",
  //             "price_prd": 21400,
  //             "size_prd": 33,
  //             "quantity_prd": 4,
  //             "gender_prd": 2,
  //             "description_prd": "Ballon Bleu de Cartier watch, 33 mm, mechanical movement with automatic winding. 18K rose gold (750/1000) case set with brilliant-cut diamonds. Fluted crown set with a sapphire cabochon. Silvered sunray-brushed dial Blued-steel sword-shaped hands. Sapphire crystal. Burgundy alligator leather strap, 18K rose gold (750/1000) ardillon buckle. Case thickness: 10 mm. Water-resistant up to 3 bar (approx. 30 meters/100 feet).",
  //             "main_img_prd": "9d52f2e84b89589caf19f397e5385662.avif",
  //             "id_brand": 4,
  //         },
  //         {
  //             "id_prd": 23,
  //             "name_prd": "AUDEMARS PIGUET ULTRA-COMPLICATION UNIVERSELLE",
  //             "price_prd": 24000,
  //             "size_prd": 42,
  //             "quantity_prd": 9,
  //             "gender_prd": 1,
  //             "description_prd": "18-carat white gold case, glareproofed sapphire crystal and caseback.",
  //             "main_img_prd": "watch.png.transform.appdpmain.png",
  //             "id_brand": 5,
  //         },
  //         {
  //             "id_prd": 24,
  //             "name_prd": "ROYAL OAK CONCEPT",
  //             "price_prd": 326086,
  //             "size_prd": 40,
  //             "quantity_prd": 12,
  //             "gender_prd": 2,
  //             "description_prd": "The 18-carat white gold Royal Oak Concept Flying Tourbillon is illuminated with 468 brilliant-cut coloured gemstones, meticulously chosen to achieve a unique rainbow effect.",
  //             "main_img_prd": "watch.png.transform.appdpmain(1).png",
  //             "id_brand": 5,
  //         },
  //         {
  //             "id_prd": 25,
  //             "name_prd": "ROYAL OAK CONCEPT",
  //             "price_prd": 391304,
  //             "size_prd": 40,
  //             "quantity_prd": 12,
  //             "gender_prd": 0,
  //             "description_prd": "Titanium case, black ceramic bezel and crown, glareproofed sapphire crystal, black ceramic and pink gold pushpieces, titanium pushpiece guards.",
  //             "main_img_prd": "watch.png.transform.appdpmain(2).png",
  //             "id_brand": 5
  //         },
  //         {
  //             "id_prd": 26,
  //             "name_prd": "5260/1455R - AQUANAUT",
  //             "price_prd": 410000,
  //             "size_prd": 38,
  //             "quantity_prd": 12,
  //             "gender_prd": 2,
  //             "description_prd": "Rose gold. Sapphire crystal case back. Humidity- and dust-protected only (not water-resistant). Diameter (10–4 o’clock): 38.8 mm. Thickness: 10.7 mm.",
  //             "main_img_prd": "5260_1455R_001_8.jpg",
  //             "id_brand": 6,
  //         },
  //         {
  //             "id_prd": 27,
  //             "name_prd": "5180/1R - COMPLICATIONS",
  //             "price_prd": 99999,
  //             "size_prd": 28,
  //             "quantity_prd": 19,
  //             "gender_prd": 1,
  //             "description_prd": "Rose gold. Skeleton movement with hand-engraved decoration. Sapphire crystal case back. Water-resistant to 30 m. Case diameter: 39 mm. Height: 6.7 mm.",
  //             "main_img_prd": "5180_1R_001_1.jpg",
  //             "id_brand": 6,
  //         },
  //         {
  //             "id_prd": 28,
  //             "name_prd": "MASTER GRANDE TRADITION",
  //             "price_prd": 217391,
  //             "size_prd": 38,
  //             "quantity_prd": 15,
  //             "gender_prd": 2,
  //             "description_prd": "43 mm - White gold 750/1000 (18 carats) - Manual winding",
  //             "main_img_prd": "04c60c7c7df7cc9ace7f01fe2c283f24591ddbfa.webp",
  //             "id_brand": 7,
  //         },
  //         {
  //             "id_prd": 29,
  //             "name_prd": "POLARIS",
  //             "price_prd": 10000,
  //             "size_prd": 38,
  //             "quantity_prd": 19,
  //             "gender_prd": 0,
  //             "description_prd": "Equipped with the new generation Jaeger-LeCoultre Calibre 899, the Polaris Date watch is dressed in black and steel. Visible beneath the sapphire crystal case-back, this reference movement - entirely designed, decorated and assembled at the Manufacture - offers almost three days of power reserve (70 hours). With its contemporary design and vintage touch, this new Polaris Date recalls the signature codes of the 1968 Memovox Polaris.",
  //             "main_img_prd": "c6fb1a8fe0c8274bc89ef10e523426298a7e4838.webp",
  //             "id_brand": 7
  //         },
  //         {
  //             "id_prd": 30,
  //             "name_prd": "CK Mesh Bracelet",
  //             "price_prd": 128,
  //             "size_prd": 35,
  //             "quantity_prd": 12,
  //             "gender_prd": 1,
  //             "description_prd": "Stainless steel case, Stainless steel mesh bracelet, Clasp closure",
  //             "main_img_prd": "43040032_710_main.webp",
  //             "id_brand": 8
  //       },
  //         {
  //             "id_prd": 31,
  //             "name_prd": "Recycled Leather Strap Automatic Watch",
  //             "price_prd": 240,
  //             "size_prd": 44,
  //             "quantity_prd": 2,
  //             "gender_prd": 0,
  //             "description_prd": "Stainless steel, 44 mm case size",
  //             "main_img_prd": "43033880_001_main.webp",
  //             "id_brand": 8
  //         },
  //         {
  //             "id_prd": 32,
  //             "name_prd": "Repeating Logo Bracelet Watch",
  //             "price_prd": 152,
  //             "size_prd": 32,
  //             "quantity_prd": 4,
  //             "gender_prd": 1,
  //             "description_prd": "32mm black or khaki IP coated stainless steel case",
  //             "main_img_prd": "43019731_001_main.webp",
  //             "id_brand": 8
  //         },
  //         {
  //             "id_prd": 33,
  //             "name_prd": "THE LONGINES MASTER COLLECTION",
  //             "price_prd": 3550,
  //             "size_prd": 42,
  //             "quantity_prd": 4,
  //             "gender_prd": 0,
  //             "description_prd": "Scratch-resistant sapphire crystal, with several layers of anti-reflective coating on both sides",
  //             "main_img_prd": "watch-collection-the-longines-master-collection-l2-773-4-71-6-1689806744.avif",
  //             "id_brand": 9
  //         },
  //         {
  //             "id_prd": 34,
  //             "name_prd": "THE LONGINES MASTER COLLECTION",
  //             "price_prd": 2850,
  //             "size_prd": 34,
  //             "quantity_prd": 8,
  //             "gender_prd": 1,
  //             "description_prd": "Scratch-resistant sapphire crystal, with several layers of anti-reflective coating on both sides",
  //             "main_img_prd": "watch-collection-the-longines-master-collection-l2-409-4-87-2-1683698655.avif",
  //             "id_brand": 9
  //         },
  //         {
  //             "id_prd": 35,
  //             "name_prd": "HYDROCONQUEST GMT",
  //             "price_prd": 2775,
  //             "size_prd": 41,
  //             "quantity_prd": 9,
  //             "gender_prd": 0,
  //             "description_prd": "The HydroConquest GMT is also distinguished by its 41 mm-diameter stainless steel case with screw-down back and crown. This model features a new unidirectional notched bezel in blue ceramic with luminescent capsule. The dial is blue.  This version comes with a stainless-steel bracelet, or a blue rubber strap.",
  //             "main_img_prd": "watch-collection-hydroconquest-l3-790-4-96-9-1694731509.avif",
  //             "id_brand": 9
  //         },
  //         {
  //             "id_prd": 36,
  //             "name_prd": "MINI DOLCEVITA",
  //             "price_prd": 3700,
  //             "size_prd": 29,
  //             "quantity_prd": 18,
  //             "gender_prd": 1,
  //             "description_prd": "Each reference in the Mini DolceVita collection features a rectangular 21.50mm x 29.00mm stainless steel case and is powered by a highly-accurate L178 quartz movement. This model dazzles with a case framed by 38 IF-VVS Top Wesselton diamonds. It is available in one of four striking fashion-forward colors – ivory white, mint green, blossom pink, and serene blue. ",
  //             "main_img_prd": "watch-collection-longines-mini-dolcevita-l5-200-0-05-2-1692876893.avif",
  //             "id_brand": 9
  //         },
  //         {
  //             "id_prd": 37,
  //             "name_prd": "OCEAN STAR DECOMPRESSION WORLDTIMER",
  //             "price_prd": 1427,
  //             "size_prd": 40,
  //             "quantity_prd": 13,
  //             "gender_prd": 0,
  //             "description_prd": "Irresistible neo-vintage style, bright colours and cutting-edge technology: the new Ocean Star Decompression Worldtimer will transport connoisseurs towards new horizons. This swiss automatic watch retains its vintage charm, and the addition of an additional time zone display propels it towards new horizons. Mido has used the latest technologies in their continual quest for excellence: Super-LumiNova®, a glassbox-style sapphire crystal, the formidable Calibre 80 with Nivachron™ balance-spring and GMT function, as well an easy change additional strap. A starfish is engraved on the screw-down case back of this new model, which is water-resistant up to a pressure of 20 bar (200 m/660 ft).",
  //             "main_img_prd": "M026.829.17.041.00_0_front_1.avif",
  //             "id_brand": 10
  //         },
  //         {
  //             "id_prd": 38,
  //             "name_prd": "RAINFLOWER NIGHT",
  //             "price_prd": 1238,
  //             "size_prd": 34,
  //             "quantity_prd": 12,
  //             "gender_prd": 1,
  //             "description_prd": "Refined and understated, the new Rainflower Swiss watch is exclusively devoted to women. Thanks to its soft, rounded forms, it offers a supremely delicate style. Whether discreet or sparkling, the dials of the various watches are all subtly decorated or engraved with a lotus flower. Equipped with the Caliber 80, a latest-generation automatic movement, the Rainflower offers exceptional autonomy of up to 80 hours of power reserve.",
  //             "main_img_prd": "M043.207.36.106.00_0_front_1.avif",
  //             "id_brand": 10
  //         },
  //         {
  //             "id_prd": 39,
  //             "name_prd": "Timex x Jacquie Aiche High Life",
  //             "price_prd": 544,
  //             "size_prd": 41,
  //             "quantity_prd": 12,
  //             "gender_prd": 2,
  //             "description_prd": "The High Life Collection brings together style, bliss, and the power of the present moment. The sweet leaf is our signature symbol of happiness. Modeled after the botanical beauty of the marijuana leaf, this design is meant to inspire freedom and bring a unique sense of empowerment to your daily essentials with its verdant malachite stone dial. Crafted in a generous 41mm size, this watch is certain to leave a lasting impression wherever you go. With powerful protection properties, malachite stone is like a personal, protective shield. It is known to direct high vibrational and cleansing energy to areas within that are in need of love.",
  //             "main_img_prd": "TW2V95200.webp",
  //             "id_brand": 11
  //         },
  //         {
  //             "id_prd": 40,
  //             "name_prd": "Q Timex x Keith Haring",
  //             "price_prd": 200,
  //             "size_prd": 38,
  //             "quantity_prd": 28,
  //             "gender_prd": 2,
  //             "description_prd": "The Q Timex x Keith Haring celebrates Haring’s iconic art legacy while reminding us of the importance of using our time wisely. The striking black and white color scheme pays tribute to his earliest pop art drawings, which were hastily sketched with chalk onto the empty black panels of NYC’s subways. Recognizable elements from his work bring an artistic energy to the overall design; particularly his signature Timex-headed figure appearing on the dial and silicone strap, reminding the wearer to face their own race against time and make every second count. Other details include all you’d expect from our Q, such as a stainless-steel case, domed acrylic crystal, ultra-precise quartz movement, and rotating top ring graced with Haring’s printed signature. © Keith Haring Foundation. Licensed by Artestar, New York.",
  //             "main_img_prd": "TW2W25600.webp",
  //             "id_brand": 11
  //         },
  //         {
  //             "id_prd": 41,
  //             "name_prd": "Timex x The MET Klimt",
  //             "price_prd": 130,
  //             "size_prd": 40,
  //             "quantity_prd": 13,
  //             "gender_prd": 1,
  //             "description_prd": "This enchanting rendition of our Modern Easy Reader® boasts a stunning dial that showcases a detail from Gustav Klimt’s (Austrian, 1862–1918) 1912–13 portrait of Mäda Primavesi. The dreamlike yet expressive likeness evokes the willful confidence of its self-possessed subject. The painting continues down the leather strap, while a simple silver-tone case creates a subtle yet sophisticated frame. Equipped with a quartz movement for superior timekeeping and a scratch-resistant mineral glass for a crystal-clear view of Klimt’s image, this watch transforms a Met collection masterpiece into a timeless work of wearable art.",
  //             "main_img_prd": "TW2W24900.webp",
  //             "id_brand": 11
  //         },
  //         {
  //             "id_prd": 42,
  //             "name_prd": "Timex T80 x Keith Haring",
  //             "price_prd": 124,
  //             "size_prd": 34,
  //             "quantity_prd": 21,
  //             "gender_prd": 2,
  //             "description_prd": "The Timex T80 x Keith Haring celebrates Haring's iconic art legacy while reminding us of the importance of using our time wisely. The striking black and white color scheme pays tribute to his earliest pop art drawings, which were hastily sketched with chalk onto the empty black panels of NYC's subways. Recognizable elements from his work bring an artistic energy to the overall design, with his printed signature gracing the case and his Timex-headed figure appearing on the lens and resin strap, reminding the wearer to face their own race against time and make every second count. Other details include all you'd expect from our T80, such as an INDIGLO® backlight, daily alarm, and date display. © Keith Haring Foundation. Licensed by Artestar, New York.",
  //             "main_img_prd": "TW2W25500.webp",
  //             "id_brand": 11
  //         },
  //         {
  //             "id_prd": 43,
  //             "name_prd": "Jewelry Watch",
  //             "price_prd": 33750,
  //             "size_prd": 36,
  //             "quantity_prd": 31,
  //             "gender_prd": 2,
  //             "description_prd": "CASE SIZE:Ø36mm, MOVEMENT:Swiss Quartz Movement, MATERIAL:PVD Rose Gold Plating, Stainless Steel, DIAL:Diamonds ",
  //             "main_img_prd": "DisplayCut.jpg",
  //             "id_brand": 12
  //         },
  //         {
  //             "id_prd": 44,
  //             "name_prd": "Versailles Present Jewelry",
  //             "price_prd": 48750,
  //             "size_prd": 33,
  //             "quantity_prd": 21,
  //             "gender_prd": 1,
  //             "description_prd": "MOVEMENT:Swiss Quartz Movement, MATERIAL:Stainless Steel, CZ, STRAP MATERIAL:Genuine Leather, CRYSTAL:Sapphire Crystal",
  //             "main_img_prd": "DisplayCut(2).jpg",
  //             "id_brand": 12
  //         },
  //         {
  //             "id_prd": 45,
  //             "name_prd": "Jewelry Watch",
  //             "price_prd": 16800,
  //             "size_prd": 18,
  //             "quantity_prd": 21,
  //             "gender_prd": 1,
  //             "description_prd": "MOVEMENT:Swiss Made Quartz  Movement, CRYSTAL:Sapphire Crystal, BUCKLE:Dual Press-Button Butterfly Buckle",
  //             "main_img_prd": "DisplayCut(3).jpg",
  //             "id_brand": 12
  //         }
  //     ])
  //     }).catch((err) => {
        
  //     });
  //   })



db.Sequelize = Sequelize
db.sequelize = sequelize

//declare db model
db.brand = require("./Brand")(sequelize, Sequelize)
db.product = require("./Product")(sequelize, Sequelize)
db.image = require("./Images")(sequelize, Sequelize)
db.account = require("./Account")(sequelize, Sequelize)
db.customer = require("./Customer")(sequelize, Sequelize)
db.staff = require("./Staff")(sequelize, Sequelize)
db.comment = require("./Comment")(sequelize, Sequelize)
db.news = require('./News')(sequelize, Sequelize)
db.order = require('./Order')(sequelize, Sequelize)
db.cart = require('./Cart')(sequelize, Sequelize)
db.orderDetail = require('./OrderDetail')(sequelize, Sequelize)
db.message = require('./Message')(sequelize, Sequelize)
db.conversation = require('./Conversation')(sequelize, Sequelize)


//Association
db.brand.hasMany(db.product, { foreignKey: "id_brand" })
db.product.belongsTo(db.brand, { foreignKey: "id_brand" })

db.product.hasMany(db.image, { foreignKey: "id_prd" })
db.image.belongsTo(db.product, { foreignKey: "id_prd" })

db.account.hasOne(db.customer, { foreignKey: { name: "id_acc", allowNull: false }, })
db.customer.belongsTo(db.account, { foreignKey: { name: "id_acc", allowNull: false } })

db.account.hasOne(db.staff, { foreignKey: "id_acc" })
db.staff.belongsTo(db.account, { foreignKey: "id_acc" })

db.product.hasMany(db.comment, { foreignKey: "id_prd" })
db.comment.belongsTo(db.product, { foreignKey: "id_prd" })
db.customer.hasMany(db.comment, { foreignKey: "id_cus" })
db.comment.belongsTo(db.customer, { foreignKey: "id_cus" })

db.staff.hasMany(db.news, { foreignKey: "id_staff" })
db.news.belongsTo(db.staff, { foreignKey: "id_staff" })

db.customer.hasMany(db.order, { foreignKey: "id_cus" })
db.order.belongsTo(db.customer, { foreignKey: "id_cus" })
db.staff.hasMany(db.order, { foreignKey: "id_staff" })
db.order.belongsTo(db.staff, { foreignKey: "id_staff" })


db.product.hasMany(db.cart, { foreignKey: "id_prd" })
db.cart.belongsTo(db.product, { foreignKey: "id_prd" })
db.customer.hasMany(db.cart, { foreignKey: "id_cus" })
db.cart.belongsTo(db.customer, { foreignKey: "id_cus" })

db.order.hasMany(db.orderDetail, { foreignKey: "id_order" })
db.orderDetail.belongsTo(db.order, { foreignKey: "id_order" })
db.product.hasMany(db.orderDetail, { foreignKey: "id_prd" })
db.orderDetail.belongsTo(db.product, { foreignKey: "id_prd" })

db.conversation.hasMany(db.message, {foreignKey: 'id_conversation'})
db.message.belongsTo(db.conversation, {foreignKey: 'id_conversation'})

db.account.hasMany(db.conversation, {foreignKey: 'id_acc1'})
db.conversation.belongsTo(db.account, {foreignKey: 'id_acc1', as: 'account1'})
db.account.hasMany(db.conversation, {foreignKey: 'id_acc2'})
db.conversation.belongsTo(db.account, {foreignKey: 'id_acc2', as : 'account2'})

db.account.hasMany(db.message, {foreignKey: 'id_send'})
db.message.belongsTo(db.account, {foreignKey: 'id_send', as: 'sender'})
db.account.hasMany(db.message, {foreignKey: 'id_receive'})
db.message.belongsTo(db.account, {foreignKey: 'id_receive',  as: 'receiver'})








module.exports = db
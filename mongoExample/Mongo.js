//총무부===================================================================================
db.Company.insert(
  { "buser_num" : NumberInt(10),
    "buser_name" : "총무부",
    "buser_loc" : "서울",
    "buser_tel" : "02-100-1111",
    "sawon" : [
                {
                  "sawon_no" : NumberInt(1),
                  "sawon_name" : "홍길동",
                  "sawon_jik" : "사장",
                  "sawon_pay" : NumberInt(8000),
                  "sawon_ibsail" : "98/09/01",
                  "sawon_gen" : "남",
                  "gogek" : [
                              {
                                "gogek_no" : NumberInt(1),
                                "gogek_name" : "이나라",
                                "gogek_tel" : "02-535-2580",
                                "gogek_jumin" : "850612-1156789"
                              },
                              {
                                "gogek_no" : NumberInt(4),
                                "gogek_name" : "김해자",
                                "gogek_tel" : "032-393-6277",
                                "gogek_jumin" : "770412-2028677"
                              },
                              {
                                "gogek_no" : NumberInt(13),
                                "gogek_name" : "배용중",
                                "gogek_tel" : "02-691-7692",
                                "gogek_jumin" : "820920-1052677"
                              }
                            ],
                },
                {
                  "sawon_no" : NumberInt(10),
                  "sawon_name" : "박치기",
                  "sawon_jik" : "사원",
                  "sawon_pay" : NumberInt(2700),
                  "sawon_ibsail" : "05/03/02",
                  "sawon_gen" : "남",
                  "gogek" : [],
                },
                {
                  "sawon_no" : NumberInt(13),
                  "sawon_name" : "박명화",
                  "sawon_jik" : "대리",
                  "sawon_pay" : NumberInt(3900),
                  "sawon_ibsail" : "03/05/01",
                  "sawon_gen" : "남",
                  "gogek" : [
                              {
                                "gogek_no" : NumberInt(15),
                                "gogek_name" : "송운하",
                                "gogek_tel" : "02-887-9344",
                                "gogek_jumin" : "830301-2013345"
                              },
                            ],
                },
                {
                  "sawon_no" : NumberInt(16),
                  "sawon_name" : "이유가",
                  "sawon_jik" : "사원",
                  "sawon_pay" : NumberInt(2900),
                  "sawon_ibsail" : "04/02/01",
                  "sawon_gen" : "여",
                  "gogek" : [],
                },
            ]
  });
//영업부==============================================================================
db.Company.insert(
  { "buser_num" : NumberInt(20),
    "buser_name" : "영업부",
    "buser_loc" : "서울",
    "buser_tel" : "02-100-2222",
    "sawon" : [
                {
                  "sawon_no" : NumberInt(2),
                  "sawon_name" : "한국남",
                  "sawon_jik" : "부장",
                  "sawon_pay" : NumberInt(6200),
                  "sawon_ibsail" : "01/01/03",
                  "sawon_gen" : "남",
                  "gogek" : [
                              {
                                "gogek_no" : NumberInt(5),
                                "gogek_name" : "차일호",
                                "gogek_tel" : "02-294-2946",
                                "gogek_jumin" : "790509-1062677"
                              },
                              {
                                "gogek_no" : NumberInt(7),
                                "gogek_name" : "이분",
                                "gogek_tel" : "02-546-2372",
                                "gogek_jumin" : "880323-2558021"
                              }
                            ],
                },
                {
                  "sawon_no" : NumberInt(3),
                  "sawon_name" : "이순신",
                  "sawon_jik" : "과장",
                  "sawon_pay" : NumberInt(4500),
                  "sawon_ibsail" : "01/03/03",
                  "sawon_gen" : "남",
                  "gogek" : [
                              {
                                "gogek_no" : NumberInt(2),
                                "gogek_name" : "김혜순",
                                "gogek_tel" : "02-375-6946",
                                "gogek_jumin" : "700101-1054225"
                              },
                              {
                                "gogek_no" : NumberInt(3),
                                "gogek_name" : "최부자",
                                "gogek_tel" : "02-692-8926",
                                "gogek_jumin" : "890305-1065773"
                              },
                              {
                                "gogek_no" : NumberInt(11),
                                "gogek_name" : "이영희",
                                "gogek_tel" : "02-195-1764",
                                "gogek_jumin" : "810103-2070245"
                              },
                            ],
                },
                {
                  "sawon_no" : NumberInt(5),
                  "sawon_name" : "이순라",
                  "sawon_jik" : "사원",
                  "sawon_pay" : NumberInt(2850),
                  "sawon_ibsail" : "09/08/05",
                  "sawon_gen" : "여",
                  "gogek" : [
                              {
                                "gogek_no" : NumberInt(8),
                                "gogek_name" : "신영래",
                                "gogek_tel" : "031-948-0283",
                                "gogek_jumin" : "790908-1063765"
                              },
                            ],
                },
                {
                  "sawon_no" : NumberInt(6),
                  "sawon_name" : "김이화",
                  "sawon_jik" : "사원",
                  "sawon_pay" : NumberInt(2850),
                  "sawon_ibsail" : "09/08/05",
                  "sawon_gen" : "여",
                  "gogek" : [
                              {
                                "gogek_no" : NumberInt(6),
                                "gogek_name" : "박상운",
                                "gogek_tel" : "032-631-1204",
                                "gogek_jumin" : "790623-1023566"
                              },
                            ],
                },
                {
                  "sawon_no" : NumberInt(8),
                  "sawon_name" : "김기만",
                  "sawon_jik" : "과장",
                  "sawon_pay" : NumberInt(4000),
                  "sawon_ibsail" : "03/01/01",
                  "sawon_gen" : "남",
                  "gogek" : [],
                },
                {
                  "sawon_no" : NumberInt(15),
                  "sawon_name" : "채미리",
                  "sawon_jik" : "사원",
                  "sawon_pay" : NumberInt(2200),
                  "sawon_ibsail" : "05/01/03",
                  "sawon_gen" : "여",
                  "gogek" : [],
                },
            ]

  });


//전산부===============================================================================
db.Company.insert(
  { "buser_num" : NumberInt(30),
    "buser_name" : "전산부",
    "buser_loc" : "서울",
    "buser_tel" : "02-100-3333",
    "sawon" : [
                {
                  "sawon_no" : NumberInt(4),
                  "sawon_name" : "이미라",
                  "sawon_jik" : "대리",
                  "sawon_pay" : NumberInt(3503),
                  "sawon_ibsail" : "04/01/04",
                  "sawon_gen" : "여",
                  "gogek" : [
                              {
                                "gogek_no" : NumberInt(9),
                                "gogek_name" : "장도리",
                                "gogek_tel" : "02-496-1204",
                                "gogek_jumin" : "870206-2063245"
                              }
                            ],
                },
                {
                  "sawon_no" : NumberInt(9),
                  "sawon_name" : "채송화",
                  "sawon_jik" : "대리",
                  "sawon_pay" : NumberInt(3507),
                  "sawon_ibsail" : "02/03/02",
                  "sawon_gen" : "여",
                  "gogek" : [
                              {
                                "gogek_no" : NumberInt(12),
                                "gogek_name" : "이소리",
                                "gogek_tel" : "02-296-1066",
                                "gogek_jumin" : "810609-2046266"
                              }
                            ],
                },
                {
                  "sawon_no" : NumberInt(11),
                  "sawon_name" : "김부해",
                  "sawon_jik" : "사원",
                  "sawon_pay" : NumberInt(1900),
                  "sawon_ibsail" : "06/09/06",
                  "sawon_gen" : "남",
                  "gogek" : [],
                },
            ]
    });
//관리부==================================================================
db.Company.insert(
  { "buser_num" : NumberInt(10),
    "buser_name" : "관리부",
    "buser_loc" : "인천",
    "buser_tel" : "032-200-4444",
        "sawon" : [
                    {
                      "sawon_no" : NumberInt(7),
                      "sawon_name" : "김부만",
                      "sawon_jik" : "부장",
                      "sawon_pay" : NumberInt(5003),
                      "sawon_ibsail" : "01/01/05",
                      "sawon_gen" : "남",
                      "gogek" : [
                                  {
                                    "gogek_no" : NumberInt(14),
                                    "gogek_name" : "김현주",
                                    "gogek_tel" : "031-167-1884",
                                    "gogek_jumin" : "800128-2062665"
                                  },
                                ],
                    },
                    {
                      "sawon_no" : NumberInt(12),
                      "sawon_name" : "박별나",
                      "sawon_jik" : "과장",
                      "sawon_pay" : NumberInt(4300),
                      "sawon_ibsail" : "99/03/05",
                      "sawon_gen" : "여",
                      "gogek" : [
                                  {
                                    "gogek_no" : NumberInt(10),
                                    "gogek_name" : "강나루",
                                    "gogek_tel" : "032-341-2867",
                                    "gogek_jumin" : "780301-1070425"
                                    },
                                  ],
                      },
                      {
                        "sawon_no" : NumberInt(14),
                        "sawon_name" : "박궁화",
                        "sawon_jik" : "사원",
                        "sawon_pay" : NumberInt(2220),
                        "sawon_ibsail" : "09/01/05",
                        "sawon_gen" : "여",
                        "gogek" : [],
                      },
                  ]
        });

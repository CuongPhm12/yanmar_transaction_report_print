$("#release_no_table").hide();

function getData() {
  let releaseNo = $("#release_no").text().trim();
  let agency_name = $("#agency_name").text().trim();
  let load_finish_date = $("#load_finish_date").text().trim();
  let agency_order_type = $("#agency_order_type").text().trim();
  let agency_cd = $("#agency_cd").text().trim();
  let item_cd = $("#item_cd").text().trim();
  let spec = $("#spec").text().trim();
  let ceo_name = $("#ceo_name").text().trim();
  let biz_no = $("#biz_no").text().trim();
  let address_info = $("#address_info").text().trim();
  let item_name = $("#item_name").text().trim();
  const data_Send = {};
  data_Send.menucode = "M000000757";
  data_Send.type = "get_data";
  data_Send.header = JSON.stringify({ releaseNo: releaseNo });
  $.ajax({
    type: "post",
    url: "/ajax.do",
    data: data_Send,
    async: false,
    success: function (response, status, request) {
      const { res } = JSON.parse(response.trim());
      console.log({ res });
      $("#tbl_config").attr("height", `${30 * res.length}px`);
      var is_completee = "";
      let total_release_amount_id = 0;
      let total_release_amount_tax_id = 0;

      for (let i = 0; i < res.length; i++) {
        let item = res[i];

        let load_finish_date_id_2 = item.load_finish_date || "";
        let item_name_id = item.item_name_id || "";
        let sale_cd_id = item.sales_cd || "";
        let spec_id = item.spec || "";
        let release_qty_id = item.release_qty == 0 ? 0 : item.release_qty || "";
        let release_price_id =
          item.release_price == 0 ? 0 : item.release_price || "";
        let release_amount_id =
          item.release_amount == 0 ? 0 : item.release_amount || "";
        let release_amount_tax_id = release_amount_id * 0.1 || "";
        total_release_amount_id += release_amount_id;
        total_release_amount_tax_id += release_amount_tax_id;
        console.log(release_amount_id);

        let newRow = `
               <tr style=" height: 28px">
                    <td class="load_finish_date_id_2"style="text-align: center; width: 15%; height: 28px">${load_finish_date_id_2}</td>
                    <td class="item_name_id" style="text-align: center; width: 15%; height: 28px">${item_name_id}</td>
                    <td class="sale_cd_id" style="text-align: center; width: 15%; height: 28px">${sale_cd_id}</td>
                    <td class="spec_id" style="text-align: center; height: 28px;" colspan="2">
                    <div style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;display: inline-block;max-width: 88px;">${spec_id}</div>
                    </td>
                    <td class="release_qty_id" style="text-align: center; width: 10%; height: 28px" colspan="2">${release_qty_id}</td>
                    <td class="release_price_id" style="text-align: center; width: 13%; height: 28px">${formatNumber(
                      release_price_id
                    )}</td>
                    <td class="release_amount_id" style="text-align: center; width: 13%; height: 28px">${formatNumber(
                      release_amount_id
                    )}</td>
                    <td class="release_amount_tax_id" style="text-align: center;width: 13%;height: 28px">${formatNumber(
                      release_amount_tax_id
                    )}</td>
                </tr>
                `;
        is_completee += newRow;
      }

      $("#tr_lv2").after(is_completee);
      $("#biz_no_id").text(biz_no);
      $("#ceo_name_id").text(ceo_name);
      $("#agency_name_id").text(agency_name);
      $("#address_info_id").text(address_info);
      $("#release_no_id").text(releaseNo);
      $("#agency_name_id").text(agency_name);
      $("#load_finish_date_id_1").text(load_finish_date);
      $("#release_amount_id_last").text(formatNumber(total_release_amount_id));
      $("#release_amount_tax_id_last").text(
        formatNumber(total_release_amount_tax_id)
      );
      $("#release_total_amount_id_last").text(
        formatNumber(total_release_amount_id + total_release_amount_tax_id)
      );
      $("#tbl_config tr:last-child").css("border-bottom-color", "transparent");

      $("#tr_lv2_dupplicate").after(is_completee);
      $("#biz_no_id_dupplicate").text(biz_no);
      $("#ceo_name_id_dupplicate").text(ceo_name);
      $("#agency_name_id_dupplicate").text(agency_name);
      $("#address_info_id_dupplicate").text(address_info);
      $("#release_no_id_dupplicate").text(releaseNo);
      $("#agency_name_id_dupplicate").text(agency_name);
      $("#load_finish_date_id_1_dupplicate").text(load_finish_date);
      $("#release_amount_id_last_dupplicate").text(
        formatNumber(total_release_amount_id)
      );
      $("#release_amount_tax_id_last_dupplicate").text(
        formatNumber(total_release_amount_tax_id)
      );
      $("#release_total_amount_id_last_dupplicate").text(
        formatNumber(total_release_amount_id + total_release_amount_tax_id)
      );
      $("#tbl_config_dupplicate tr:last-child").css(
        "border-bottom-color",
        "transparent"
      );
    },
    error: function (xmlHttpRequest, txtStatus, errorThrown) {
      console.log("erorr");
    },
  });
}
getData();

//format định dạng số
function formatNumber(number) {
  // Chuyển số thành chuỗi
  let numStr = number.toString();

  // Tìm vị trí của dấu thập phân
  let decimalIndex = numStr.indexOf(".");

  // Nếu không có dấu thập phân, gán vị trí cuối cùng của chuỗi
  if (decimalIndex === -1) {
    decimalIndex = numStr.length;
  }

  // Duyệt qua chuỗi từ cuối về đầu và chèn dấu ',' sau mỗi ba chữ số
  for (let i = decimalIndex - 3; i > 0; i -= 3) {
    numStr = numStr.slice(0, i) + "," + numStr.slice(i);
  }

  // Trả về chuỗi đã định dạng
  return numStr;
}

function getNum(val) {
  if (isNaN(val)) {
    return 0;
  }
  return val;
}

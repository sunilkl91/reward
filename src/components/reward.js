import { useState } from 'react';
var customerData = [{
  id: 1,
  userId: 1,
  name: 'jonathan',
  items: 'soap,colgate,brush',
  purchaseAmount: 12,
  rewardPoints: 0,
  date: '2021-08-27'
}, {
  id: 2,
  userId: 1,
  name: 'jonathan',
  items: 'tv',
  purchaseAmount: 400,
  rewardPoints: 0,
  date: '2021-08-05'
}, {
  id: 3,
  userId: 1,
  name: 'jonathan',
  items: 'refrigerator',
  purchaseAmount: 810,
  rewardPoints: 0,
  date: '2021-07-05'
}, {
  id: 4,
  userId: 1,
  name: 'jonathan',
  items: 'shirt',
  purchaseAmount: 75,
  rewardPoints: 0,
  date: '2021-06-04'
}, {
  id: 5,
  userId: 2,
  name: 'rocky',
  items: 'biscuit,wafers',
  purchaseAmount: 118,
  rewardPoints: 0,
  date: '2021-08-26'
}, {
  id: 6,
  userId: 2,
  name: 'rocky',
  items: 'smartphone samsung',
  purchaseAmount: 200,
  rewardPoints: 0,
  date: '2021-07-07'
}, {
  id: 7,
  userId: 2,
  name: 'rocky',
  items: 'refrigerator',
  purchaseAmount: 1010,
  rewardPoints: 0,
  date: '2021-06-05'
}, {
  id: 8,
  userId: 2,
  name: 'rocky',
  items: 'dress',
  purchaseAmount: 55,
  rewardPoints: 0,
  date: '2021-07-04'
}, {
  id: 9,
  userId: 2,
  name: 'rocky',
  items: 'dress',
  purchaseAmount: 65.45,
  rewardPoints: 0,
  date: '2021-06-14'
}, {
  id: 10,
  userId: 2,
  name: 'rocky',
  items: 'shoes',
  purchaseAmount: 55.55,
  rewardPoints: 0,
  date: '2021-06-24'
},{
    id: 11,
    userId: 3,
    name: 'paresh',
    items: 'shoes',
    purchaseAmount: 94,
    rewardPoints: 0,
    date: '2021-08-24'
  }]
function Reward() {
    let [rewardData, setRewardData] = useState([]);
    let [monthTxt, setMonthTxt] = useState('');
    function changeMonth(event) {
      var rewardData = [];
      const { options, selectedIndex } = event.target;
      setMonthTxt(options[selectedIndex].innerHTML);
      customerData.map(function (data) {
        if ((new Date(data.date).getMonth() + 1) == event.target.value) {
          let uniqueCustomer = {
            id: data.id,
            name: data.name,
            userId: data.userId,
            date: data.date,
            rewardPoints: data.rewardPoints
          }
  
          if (parseFloat(data.purchaseAmount) > 50 && parseFloat(data.purchaseAmount) > 100) {
            let pAmt = parseFloat(data.purchaseAmount);
            uniqueCustomer.rewardPoints = (uniqueCustomer.rewardPoints + 1) * 50;
            pAmt = pAmt - 100;
            uniqueCustomer.rewardPoints = uniqueCustomer.rewardPoints + (2 * pAmt);
          } else if (parseFloat(data.purchaseAmount) > 50 && parseFloat(data.purchaseAmount) < 100) {
            let pAmt = parseFloat(data.purchaseAmount);
            pAmt = pAmt - 50;
            uniqueCustomer.rewardPoints = (uniqueCustomer.rewardPoints + 1) * pAmt;
          }
          rewardData.push(uniqueCustomer);
        }
      });
      var rewardDataFinal = [];
      rewardData.map(function (data) {
        const key = "'" + data.userId + "'";
        if (!rewardDataFinal[key]) {
          rewardDataFinal[key] = {
            name: data.name,
            total: parseFloat(data.rewardPoints),
            transaction: []
          }
          rewardDataFinal[key].transaction.push(data)
        } else {
          rewardDataFinal[key].transaction.push(data)
          rewardDataFinal[key].total = rewardDataFinal[key].total + parseFloat(data.rewardPoints);
        }
      });
      console.log(rewardDataFinal);
      setRewardData(rewardDataFinal);
    }
    return (
      <div className="App">
        <div className="custom-select">
          <select name="month" id="month" onChange={changeMonth} style={{ float: 'right', marginRight: 50, marginTop: 50 }}>
            <option value="">Select Month</option>
            <option value="6">June</option>
            <option value="7">July</option>
            <option value="8">August</option>
          </select>
        </div>
        <table>
          <caption>Customer Transaction Data</caption>
          <thead>
            <tr>
              <th scope="col">userId</th>
              <th scope="col">Name</th>
              <th scope="col">Items</th>
              <th scope="col">Amount</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            {customerData.map(function (data) {
              return (
                <tr key={data.id}>
                  <td>{data.userId}</td>
                  <td>{data.name}</td>
                  <td>{data.items}</td>
                  <td>${data.purchaseAmount}</td>
                  <td>{data.date}</td>
                </tr>)
            })}
  
          </tbody>
        </table>
        <br /> <br /> <br />
        {monthTxt !== 'Select Month' && monthTxt !== '' ?
          <h1>Customer Reward Summary {monthTxt} Month</h1> : null}
        {Object.keys(rewardData).length > 0 ?
          <div>
            {Object.keys(rewardData).map(key => {
              return (
                <div key={key}>
                  <h2>Customer Name: <span className="colorRed">{rewardData[key].name}</span>&nbsp;&nbsp;&nbsp;&nbsp;Total Reward Points: <span className="colorRed">{rewardData[key].total.toFixed(2)}</span></h2>
  
                  {<table>
                    <caption>Transactions</caption>
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Reward Points</th>
                        <th scope="col">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {rewardData[key].transaction.map(function (data) {
                        return (
                          <tr key={data.id}>
                            <td>{data.name}</td>
                            <td>{data.rewardPoints.toFixed(2)}</td>
                            <td>{data.date}</td>
                          </tr>)
                      })}
  
                    </tbody>
                  </table>}
                </div>
              )
            })}
          </div> : <h1>No Data Found</h1>}
      </div>
    );
  }
  export default Reward;
  
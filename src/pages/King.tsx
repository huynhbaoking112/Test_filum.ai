// import Swiper core and required modules
import GaugeComponent from 'react-gauge-component';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

interface KingProps{
  val: number
}

export default function King({val} : KingProps){
  

  return (
    <div className='h-full w-full'>
      
     <GaugeComponent
    type='grafana'
    arc={{
      width: 0.2,
      padding: 0,
      cornerRadius: 1,
      // gradient: true,
      subArcs: [
        {
          limit: 2,
          color:  '#EA4228',
          showTick: false,
          tooltip: {
            text: "Sơ khai"
          },
          // onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
          // onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
          // onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
        },
        {
          limit: 4,
          color: '#F5CD19',
          showTick: false,
          tooltip: {
            text: "Thành Lập"
          }
        },
        {
          limit: 6,
          color: '#5BE12C',
          showTick: false,
          tooltip: {
            text: "Vận hành"
          }
        },
        {
          limit: 8, color: '#F5CD19', 
          showTick: false,
          tooltip: {
            text: "Tối ưu"
          }
        },
        { limit :10,
          color: '#EA4228',
          showTick: false,
          tooltip: {
            text: "Thấm nhuần"
          }
        }
      ]
    }}
    pointer={{
      color: '#F6B714', // Màu kim chỉ
      length: 0.60, // Chiều dài kim chỉ
      width: 9, // Độ rộng kim chỉ
      elastic: true, // Kích hoạt hiệu ứng chuyển động đàn hồi (elastic transition)
    }}
 
    labels={{
      valueLabel: { formatTextValue: value => value + "\nScore" , style: { fontSize: 25, fontWeight: 'bold'} },
      tickLabels: {
        type: 'outer',
        defaultTickValueConfig: { 
          formatTextValue: (value: any): string   => {
            if(value<2){
              return "Sơ khai"
            }else if (value<4){
              return "Thành Lập"
            }else if (value< 6){
              return "Vận hành"
            }else if (value<8){
              return "Tối ưu"
            }else {
              return "Thấm nhuần"
            }
          } ,
          style: {fontSize: 15, fontWeight: 'bold' }
      },
        ticks: [
        { value: 1 },  // Giữa 0 và 2
        { value: 3 },  // Giữa 2 và 4
        { value: 5 },  // Giữa 4 và 6
        { value: 7 },  //
        { value: 9 },  //
        ],
      }
    }}
    value={val}
    minValue={0}
    maxValue={10}
  />

    </div>
  );
};
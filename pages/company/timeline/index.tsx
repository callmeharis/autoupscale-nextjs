import React, { ReactElement, useState } from 'react';
import Timeline, {
  TimelineMarkers,
  TodayMarker,
  CustomMarker,
  CursorMarker
} from "react-calendar-timeline";
import Multiselect from 'multiselect-react-dropdown';
import { useFormik } from 'formik';
import { Button } from 'react-bootstrap';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import TimelineApi from '../../../pages/api/timeline';
import VehichleApi from '../../../pages/api/vehicle';
import { useEffectAsync } from '../../../utils/react';
import { ReservationStatus } from '../../../utils/options/reservation-status-options';
import { ReservationEntity } from '../../../models/admin/reservation.entity';
import { TimelineDto } from '../../../models/timeline/timeline.dto';
import { VehicleEntity } from '../../../models/admin/vehicle/vehicle.entity';
import { GetReservationOptions } from '../../../types/get-reservation-option.type';
import { GetVehiclesDropdownOptions } from '../../../types/vehicle/get-vehicles-dropdown-options.type';
import FullLayout from '../../../components/layouts/company/full-layout';
import ShowFormattedDate from '../../../components/date-formatter';
import BaseSelect from '../../../components/forms/base-select';
import { BsFilterRight } from 'react-icons/bs';
import { GetVehiclesOptions } from '@/types/vehicle/get-vehicles-options.type';


export default function TimeLine() {
  const [reservations, setReservations] = useState<ReservationEntity[]>([]);
  const [dropDownData, setDropDownData] = useState<GetVehiclesDropdownOptions>()
  const [vehicles, setVehicles] = useState<VehicleEntity[]>([])
  const [showFilters, setShowFilters] = useState<boolean>(false)

  const timelineApi = new TimelineApi();
  const vehichleApi = new VehichleApi()

  useEffectAsync(async () => {
    try {
      const data = await timelineApi.list();
      setReservations(data);
    } catch (error) {
    }
  }, []);

  let groups = [];
  let items = [];
  reservations.forEach((res) => {
    groups.push({
      id: res?.id,
      title: res?.vehicle?.name,
      rego: res?.vehicle?.rego,
      status_string: res.status_string
    });
    items.push({
      id: res.id,
      title: res?.vehicle?.name,
      customer: res?.customer?.full_name,
      group: res?.id,
      total: res?.total,
      start_time: moment(res?.start_date).add('days'),
      show_start_date: res?.start_date,
      show_end_date: res?.end_date,
      end_time: res?.end_date ? moment(res?.end_date).add('days') : moment().add('days'),
      status: res?.status_string
    });
  });

  const groupRenderer = ({ group }) => {
    return (
      <div className='flex justify-center items-center align-top flex-column text-sm'>
        <span className='flex overflow-hidden h-[27px] w-full justify-center leading-normal mt-[8px] font-semibold'>
          {group?.title}
        </span>
        <span className='flex overflow-hidden h-[27px] w-full justify-center leading-normal items-center bg-green-50 text-green-800 font-semibold'>
          <span className='mx-1 h-1.5 w-1.5 rounded-full bg-green-600'></span>
          {group?.status_string}
        </span>
        <span className='flex overflow-hidden h-[27px] w-full justify-center leading-normal border-1 bg-white rounded-sm'>
          {group?.rego}
        </span>
      </div>
    );
  };

  const itemRenderer = ({ item, getItemProps }) => {

    return (
      <div  {...getItemProps({
        style: {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          cursor: "pointer",
        }
      })}
        className={`event-time-background-${item?.status}`}
      >
        <div className='flex justify-center items-center align-top flex-column text-sm ml-4 overflow-auto'>
          <span className="flex overflow-hidden h-[35px] w-full justify-start leading-normal items-center  font-semibold">
            <span>From:</span>
            <ShowFormattedDate date={item?.show_start_date} hideTime />
            <span>Total:</span>
            <span className='mx-2 font-bold'>{item.total}$</span>
          </span>
          <span className="flex overflow-hidden h-[35px] w-full justify-start leading-normal items-center  font-semibold">
            <span>To:</span>
            <span className="w-[105px]"><ShowFormattedDate date={item?.show_end_date} hideTime />
            </span>
            <span>Cutomer Name:</span>
            <span className='mx-2 font-bold'>{item.customer}</span></span>

        </div>
      </div >
    );
  };


  const form = useFormik({
    initialValues: new TimelineDto(),
    validationSchema: TimelineDto.timelineYupSchema(),
    onSubmit: async () => {
    },
    onReset: async () => {
      try {
        const data = await timelineApi.list()
        setReservations(data)
        setDropDownData(null)
      } catch (error) {
      }
    }


  })

  useEffectAsync(async () => {

    if (Array.isArray(form?.values?.vehicle_id) && form?.values?.vehicle_id?.length === 0) {
      delete form.values.vehicle_id;
    }
    if (Array.isArray(form?.values?.user_id) && form?.values?.user_id?.length === 0) {
      delete form.values.user_id;
    }
    if (!form?.values?.status) delete form?.values?.status

    try {
      const data = await timelineApi.list(form.values as GetReservationOptions);
      setReservations(data);
    } catch (error) {
    };

  }, [form.values])

  useEffectAsync(async () => {
    try {
      const dropdownData = await vehichleApi.getVehichleDropDownData({
        vehicle_type_id: 1,
      } as GetVehiclesOptions);
      setDropDownData(dropdownData);

      const data = await vehichleApi.list()
      setVehicles(data)
    } catch (error) {
    }
  }, [])


  const [visibleTimeStart, setVisibleTimeStart] = useState(
    moment().startOf("day").valueOf()
  );
  const [visibleTimeEnd, setVisibleTimeEnd] = useState(
    moment().startOf("day").add(1, "day").valueOf()
  );

  const onPrevClick = () => {
    const zoom = visibleTimeEnd - visibleTimeStart;
    setVisibleTimeStart((prev) => prev - zoom);
    setVisibleTimeEnd((prev) => prev - zoom);
  };

  const onNextClick = () => {
    const zoom = visibleTimeEnd - visibleTimeStart;
    setVisibleTimeStart((prev) => prev + zoom);
    setVisibleTimeEnd((prev) => prev + zoom);
  };

  const onMonthClick = () => {
    const startOfMonth = moment().startOf("month").valueOf();
    const endOfMonth = moment().endOf("month").valueOf();
    setVisibleTimeStart(startOfMonth);
    setVisibleTimeEnd(endOfMonth);
  };

  const onYearClick = () => {
    const startOfYear = moment().startOf("year").valueOf();
    const endOfYear = moment().endOf("year").valueOf();
    setVisibleTimeStart(startOfYear);
    setVisibleTimeEnd(endOfYear);
  };
  const onWeekClick = () => {
    const startOfYear = moment().startOf("week").valueOf();
    const endOfYear = moment().endOf("week").valueOf();
    setVisibleTimeStart(startOfYear);
    setVisibleTimeEnd(endOfYear);
  };
  const onDayClick = () => {
    const startOfYear = moment().startOf("day").valueOf();
    const endOfYear = moment().endOf("day").valueOf();
    setVisibleTimeStart(startOfYear);
    setVisibleTimeEnd(endOfYear);
  };

  return (
    <div className='px-4 py-3'>

      <div className='max-w-7xl m-auto h-screen overflow-auto shadow-md '>
        {/*    
        <Timeline
          groups={groups}
          items={items}
          defaultTimeStart={moment().add(-12, 'days')}
          defaultTimeEnd={moment().add(12, 'days')}
          groupRenderer={groupRenderer}
          itemRenderer={itemRenderer}
          lineHeight={90}
          canMove={false}
          itemHeightRatio={0.8}
        /> */}
        <div className='flex justify-between  my-4'>
          <div className='flex'>
            <Button className="mr-2 mb-2 bg-btn-100 h-[40px]" onClick={onPrevClick}>Prev</Button>
            <Button className="mb-2 bg-btn-100 h-[40px]" onClick={onNextClick}>Next</Button>

          </div>
          <div className='flex'>

            <Button className="mb-2 bg-btn-100-borderless h-[40px]" onClick={onDayClick}>Day</Button>
            <Button className="mb-2 bg-btn-100-borderless h-[40px]" onClick={onWeekClick}>Week</Button>
            <Button className="mb-2 bg-btn-100-borderless h-[40px]" onClick={onMonthClick}>Month</Button>
            <Button className="mb-2 bg-btn-100-borderless h-[40px]" onClick={onYearClick}>Year</Button>
            <Button className="border text-sm h-[40px] text-black p-[6px] rounded  flex items-center ml-6 bg-slate-300 hover:bg-slate-400" onClick={() => setShowFilters(!showFilters)}>
              <BsFilterRight className="text-2xl" />
              Filters
            </Button>

          </div>
        </div>
        <div>
          {Boolean(showFilters) &&
            <div className='mb-4 w-full'>
              <form onSubmit={form.handleSubmit} onReset={form.handleReset}>
                <div className='flex items-end pb-0'>
                  <div className='mb-2 md:mb-0 md:mr-4 flex-grow '>
                    <p className='text-gray-400 tracking-wide text-sm mb-2 block'>Owners</p>
                    <Multiselect
                      className='multiselect-dropdown-custom'
                      isObject={false}
                      onKeyPressFn={function noRefCheck() { }
                      }
                      onSearch={function noRefCheck() { }}

                      onSelect={
                        (event) => {
                          const selectedIds = event.map((name) => {
                            const investor = dropDownData?.investors?.find(
                              (type) => `${type?.first_name} ${type?.last_name}` === name
                            );
                            return investor?.id;
                          });

                          form.setFieldValue(
                            "user_id", selectedIds
                          )
                        }

                      }
                      options={dropDownData?.investors?.map((type) => (
                        `${type?.first_name} ${type?.last_name}`
                      ))}

                      onRemove={(event) => {
                        const selectedIds = event.map((name) => {
                          const investor = dropDownData?.investors.find(
                            (type) => `${type?.first_name} ${type?.last_name}` === name
                          );
                          return investor?.id;
                        });

                        form.setFieldValue(
                          "user_id", selectedIds
                        )
                      }}
                    />
                  </div>
                  <div className='ml-2 mb-2 md:mb-0 md:mr-4 flex-grow'>
                    <p className='text-gray-400 tracking-wide text-sm mb-2 block'>Vehicles</p>
                    <Multiselect
                      className='multiselect-dropdown-custom'
                      isObject={false}
                      onKeyPressFn={function noRefCheck() { }}
                      onSearch={function noRefCheck() { }}
                      onSelect={
                        (event) => {
                          const selectedIds = event.map((name) => {
                            const vehicle = vehicles?.find(
                              (type) => type?.name === name
                            );
                            return vehicle?.id;
                          });
                          form.setFieldValue(
                            "vehicle_id", selectedIds
                          )
                        }
                      }
                      options={vehicles?.map((type) => (
                        type?.name
                      ))}

                      onRemove={(event) => {
                        const selectedIds = event.map((name) => {
                          const vehicle = vehicles?.find(
                            (type) => type?.name === name
                          );
                          return vehicle?.id;
                        });
                        form.setFieldValue(
                          "vehicle_id", selectedIds
                        )
                      }}
                    />
                  </div>
                  <div className="mb-2 md:mb-0 md:mr-4 flex-grow">
                    <BaseSelect
                      placeholder="Choose One"
                      name="status"
                      label="Reservation Status"
                      options={ReservationStatus?.map((type) => ({
                        value: type?.id,
                        label: type?.name,
                      }))}
                      formik={form}
                    />
                  </div>
                  <Button className="mb-2 bg-btn-100 h-[40px]" type='reset'>clear</Button>
                </div>
              </form>
            </div>

          }
          <Timeline
            groups={groups}
            items={items}
            groupRenderer={groupRenderer}
            itemRenderer={itemRenderer}
            sidebarWidth={150}
            canResize="right"
            canSelect
            // canMove={false}
            itemsSorted
            itemTouchSendsClick={false}
            stackItems
            itemHeightRatio={0.75}
            buffer={1}
            lineHeight={90}
            visibleTimeStart={visibleTimeStart}
            visibleTimeEnd={visibleTimeEnd}

          >
            <TimelineMarkers>
              <TodayMarker />
              <CustomMarker
                date={moment().startOf("day").valueOf() + 1000 * 60 * 60 * 2}
              />
              <CustomMarker date={moment().add(3, "day").valueOf()}>
                {({ styles }) => {
                  const newStyles = { ...styles, backgroundColor: "blue" };
                  return <div style={newStyles} />;
                }}
              </CustomMarker>
              <CursorMarker />
            </TimelineMarkers>
          </Timeline>
        </div>
        <div>
        </div>
      </div>
    </div >
  );
}
TimeLine.getLayout = function getLayout(page: ReactElement) {
  return <FullLayout>{page}</FullLayout>;
};
/* eslint-disable jsx-a11y/anchor-is-valid */
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import ModalClose from '@mui/joy/ModalClose';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Table from '@mui/joy/Table';
import Sheet from '@mui/joy/Sheet';
import Checkbox from '@mui/joy/Checkbox';
import IconButton, { iconButtonClasses } from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import Dropdown from '@mui/joy/Dropdown';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import SearchIcon from '@mui/icons-material/Search';
import MoreHorizRoundedIcon from '@mui/icons-material/MoreHorizRounded';
import RemoveModal from './RemoveModal';
import EditModal from './EditModal';
import { ManufacturerEnum, manufacturerArray } from '../data/manufacturer';
import { LocationEnum, locationArray } from '../data/location';
import { detailedTypeArray, partArray } from '../data/part';
import HistoryModal from './HistoryModal';
import { Part, History } from '../response/part';
import { getPartList } from '../httpRequest';

const items = [
  {
    id: 0,
    manufacturer: 'HP',
    type: 'PCI Card',
    detailedType: 'RC',
    partName: 'P220i',
    partNumber: '670026-001',
    quantity: 5,
    place: '문화관',
    detailedPlace: 'HN-67'
  },
  {
    id: 1,
    manufacturer: 'IBM',
    type: 'PCI Card',
    detailedType: 'HBA',
    partName: '8G 2-Port',
    partNumber: '00E0806',
    quantity: 2,
    place: '문화관',
    detailedPlace: 'HN-67 / NPR-109'
  },
  {
    id: 2,
    manufacturer: 'HP',
    type: 'PCI Card',
    detailedType: 'RC',
    partName: 'P411',
    partNumber: '462918-001',
    quantity: 3,
    place: '문화관',
    detailedPlace: 'NPR-108'
  }
]


// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)

function RowMenu({
  setOpen, 
  setEditModalOpen, 
  setHistoryModalOpen,
  id,
  setId
}: {
  setOpen: Dispatch<SetStateAction<boolean>>; 
  setEditModalOpen: Dispatch<SetStateAction<boolean>>; 
  setHistoryModalOpen: Dispatch<SetStateAction<boolean>>
  id: number,
  setId: Dispatch<SetStateAction<number>>
}) {
  return (
    <Dropdown>
      <MenuButton
        slots={{ root: IconButton }}
        slotProps={{ root: { variant: 'plain', color: 'neutral', size: 'sm' } }}
        onClick={() => setId(id)}
      >
        <MoreHorizRoundedIcon />
      </MenuButton>
      <Menu size="sm" sx={{ minWidth: 140 }}>
        <MenuItem onClick={() => {
          setEditModalOpen(true)
          }}>Edit Data</MenuItem>
        <MenuItem onClick={() => {
          setHistoryModalOpen(true)
          }}>Manage History</MenuItem>
        <Divider />
        <MenuItem color="danger" onClick={() => setOpen(true)}>Delete</MenuItem>
      </Menu>
    </Dropdown>
  );
}

export default function OrderTable() {
  const [data, setData] = useState<Array<Part>>([]);
  const [filteredData, setFilteredData] = useState<Array<Part>>([]);
  const [modalOpen, setModalOepn] = useState<boolean>(false);
  const [editModalOpen, setEditModalOpen] = useState<boolean>(false);
  const [historyModalOpen, setHistoryModalOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState(0)
  const [searchKeyWord, setSearchKeyWord] = useState('')

  const [filter, setFilter] = useState({
    type: 'ALL',
    detailedType: 'ALL',
    manufacturer: 'ALL',
    place: 'ALL'
  })

  const calculateQuantity = (historyArray: Array<History>) => {
    const acc = historyArray.reduce((prev, curr) => {
      if (curr.isImport) {
        prev.quantity += curr.quantity
      } else {
        prev.quantity -= curr.quantity
      }
      return prev
    }, {isImport: true, quantity: 0})

    return acc.quantity
  }

  useEffect(() => {
    getPartList().then((res) => {
      setData(res.data)
      setFilteredData(res.data)
    })

  },[])

  useEffect(() => {

    const filteredData = data.filter(part => {
      if (filter.type === 'ALL') {
        return true;
      } else {
        return part.type === filter.type
      }
     }).filter(part => {
      if (filter.detailedType === 'ALL') {
        return true;
      } else {
        return part.detailedType === filter.detailedType
      }
    }).filter(part => {
      if(filter.manufacturer === 'ALL') {
        return true;
      } else {
        return part.manufacturer === filter.manufacturer
      }
    }).filter(part => {
      if(filter.place === 'ALL') {
        return true;
      } else {
        return part.storageLocation === filter.place
      }
    }).filter(part => part.number.startsWith(searchKeyWord) || part.name.startsWith(searchKeyWord)) 
    setFilteredData(filteredData)
  },[filter.detailedType, filter.manufacturer, filter.place, filter.type, searchKeyWord])

  const renderFilters = () => (
    <>
      <FormControl size="sm">
        <FormLabel>type</FormLabel>
        <Select size="sm" placeholder="ALL" value={filter.type} onChange={(_, value) => {
          console.log(value)
          setFilter(prev => ({...prev, type: value || 'ALL'}))
        }}>
          <Option value="ALL">ALL</Option>
          {partArray.map((type, idx) => (<Option value={type} key={idx}>{type}</Option>))}
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>detailed type</FormLabel>
        <Select size="sm" placeholder="ALL" id="detailedType" value={filter.detailedType} onChange={(_, value) => {
          console.log(value)
          setFilter(prev => ({...prev, detailedType: value || 'ALL'}))
        }}>
          <Option value="ALL">ALL</Option>
          {detailedTypeArray.map((detailedType, idx) => (<Option value={detailedType} key={idx}>{detailedType}</Option>))}
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>manufacturer</FormLabel>
        <Select size="sm" placeholder="ALL" value={filter.manufacturer} onChange={(_, value) => {
          setFilter(prev => ({...prev, manufacturer: value || 'ALL'}))
        }}>
          <Option value="ALL">ALL</Option>
          {manufacturerArray.map((manufacturer: ManufacturerEnum, idx) => (<Option value={manufacturer} key={idx}>{manufacturer}</Option>))}
        </Select>
      </FormControl>
      <FormControl size="sm">
        <FormLabel>place</FormLabel>
        <Select size="sm" placeholder="ALL" value={filter.place} onChange={(_, value) => {
          setFilter(prev => ({...prev, place: value || 'ALL'}))
        }}>
          <Option value="ALL">ALL</Option>
          {locationArray.map((location: LocationEnum, idx) => (<Option value={location} key={idx}>{location}</Option>))}
          <Option value="문화관">문화관</Option>
        </Select>
      </FormControl>
    </>
  );
  return (
    <>
      <Sheet
        className="SearchAndFilters-mobile"
        sx={{
          display: { xs: 'flex', sm: 'none' },
          my: 1,
          gap: 1,
        }}
      >
        <Input
          size="sm"
          placeholder="Search"
          startDecorator={<SearchIcon />}
          sx={{ flexGrow: 1 }}
        />
        <IconButton
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setOpen(true)}
        >
          <FilterAltIcon />
        </IconButton>
        <Modal open={open} onClose={() => setOpen(false)}>
          <ModalDialog aria-labelledby="filter-modal" layout="fullscreen">
            <ModalClose />
            <Typography id="filter-modal" level="h2">
              Filters
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Sheet sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {renderFilters()}
              <Button color="primary" onClick={() => setOpen(false)}>
                Submit
              </Button>
            </Sheet>
          </ModalDialog>
        </Modal>
      </Sheet>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
        }}
      >
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Search for name or part number</FormLabel>
          <Input size="sm" placeholder="Search" startDecorator={<SearchIcon />} value={searchKeyWord} onChange={(e) => {setSearchKeyWord(e.target.value)}}/>
        </FormControl>
        {renderFilters()}
      </Box>
      <Sheet
        className="OrderTableContainer"
        variant="outlined"
        sx={{
          display: { xs: 'none', sm: 'initial' },
          width: '100%',
          borderRadius: 'sm',
          flexShrink: 1,
          overflow: 'auto',
          minHeight: 0,
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          stickyHeader
          hoverRow
          sx={{
            '--TableCell-headBackground': 'var(--joy-palette-background-level1)',
            '--Table-headerUnderlineThickness': '1px',
            '--TableRow-hoverBackground': 'var(--joy-palette-background-level1)',
            '--TableCell-paddingY': '4px',
            '--TableCell-paddingX': '8px',
          }}
        >
          <thead>
            <tr>
              <th style={{ width: 48, textAlign: 'center', padding: '12px 6px' }}>
                <Checkbox
                  size="sm"
                  indeterminate={
                    selected.length > 0 && selected.length !== items.length
                  }
                  checked={selected.length === items.length}
                  onChange={(event) => {
                    setSelected(
                      event.target.checked ? items.map((item) => item.id) : [],
                    );
                  }}
                  color={
                    selected.length > 0 || selected.length === items.length
                      ? 'primary'
                      : undefined
                  }
                  sx={{ verticalAlign: 'text-bottom' }}
                />
              </th>
              <th style={{ width: 140, padding: '12px 6px' }}>manufacturer</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Type</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Detailed Type</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Name</th>
              <th style={{ width: 140, padding: '12px 6px' }}>P/N</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Quantity</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Place</th>
              <th style={{ width: 140, padding: '12px 6px' }}>Detailed Place</th>
              <th style={{ width: 70, padding: '12px 6px' }}></th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((item) => (
              <>
              <tr key={item.id}>
                <td style={{ textAlign: 'center', width: 120 }}>
                  <Checkbox
                    size="sm"
                    checked={selected.includes(item.id)}
                    color={selected.includes(item.id) ? 'primary' : undefined}
                    onChange={(event) => {
                      setSelected((ids) =>
                        event.target.checked
                          ? ids.concat(item.id)
                          : ids.filter((itemId) => itemId !== item.id),
                      );
                    }}
                    slotProps={{ checkbox: { sx: { textAlign: 'left' } } }}
                    sx={{ verticalAlign: 'text-bottom' }}
                  />
                </td>
                <td>
                  <Typography level="body-xs">{item.manufacturer}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{item.type}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{item.detailedType}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{item.name}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{item.number}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">
                    {calculateQuantity(item.histories)}
                  </Typography>
                </td>
                <td>
                  <Typography level="body-xs">{item.storageLocation}</Typography>
                </td>
                <td>
                  <Typography level="body-xs">{item.detailedStorageLocation}</Typography>
                </td>
                <td>
                  <RowMenu setOpen={setModalOepn} setEditModalOpen={setEditModalOpen} setHistoryModalOpen={setHistoryModalOpen} id={item.id} setId={setId}/>
                </td>
                {/* <td>
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <RowMenu />
                  </Box>
                </td> */}
              </tr>
              </>
            ))}
          </tbody>
        </Table>
      </Sheet>
      <Box
        className="Pagination-laptopUp"
        sx={{
          pt: 2,
          gap: 1,
          [`& .${iconButtonClasses.root}`]: { borderRadius: '50%' },
          display: {
            xs: 'none',
            md: 'flex',
          },
        }}
      >
        {/* <Button
          size="sm"
          variant="outlined"
          color="neutral"
          startDecorator={<KeyboardArrowLeftIcon />}
        >
          Previous
        </Button>

        <Box sx={{ flex: 1 }} />
        {['1', '2', '3', '…', '8', '9', '10'].map((page) => (
          <IconButton
            key={page}
            size="sm"
            variant={Number(page) ? 'outlined' : 'plain'}
            color="neutral"
          >
            {page}
          </IconButton>
        ))}
        <Box sx={{ flex: 1 }} />

        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          endDecorator={<KeyboardArrowRightIcon />}
        >
          Next
        </Button> */}
      </Box>
      <HistoryModal open={historyModalOpen} setOpen={setHistoryModalOpen} histories={data.find(part => part.id === id )?.histories} id={id}/>
      <RemoveModal open={modalOpen} setOpen={setModalOepn} id={id} />
      <EditModal open={editModalOpen} setOpen={setEditModalOpen} data={data.find(part => part.id === id)}/>
      
    </>
  );
}

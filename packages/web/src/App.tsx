import { Button, Form, Input, Modal, Space, Table } from 'antd'
import axios from 'axios';
import { useEffect, useState } from 'react'

function App() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [modelId, setModelId] = useState<number | null>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    form.setFieldsValue({ name: '' })
  }, [open])

  function getData() {
    axios.get('/api/table').then(res => {
      setData(res.data);
    })
  }

  async function onFinish(values: any) {
    if (!modelId) {
      await axios.post('/api/table', {
        name: values.name
      });
    } else {
      await axios.post('/api/table/column', {
        modelId,
        name: values.name,
        type: 'varchar',
      });
    }
    setOpen(false);
    getData();
  }

  return (
    <Space
      direction='vertical'
      style={{ width: '100%' }}
    >
      <Button
        onClick={() => {
          setOpen(true);
          setModelId(null);
        }}
        type='primary'
      >
        创建模型
      </Button >
      <Table
        rowKey={'id'}
        dataSource={data}
        columns={[
          {
            dataIndex: 'name',
            title: '模型名称',
          },
          {
            dataIndex: 'id',
            title: '操作',
            render: (v) => (
              <Button
                type='link'
                onClick={
                  () => {
                    setOpen(true);
                    setModelId(v);
                  }
                }
              >
                添加列
              </Button>
            )
          }
        ]}
        size='small'
        pagination={false}
      />
      <Modal
        title="创建"
        open={open}
        onCancel={() => setOpen(false)}
        onOk={() => {
          form.submit();
        }}
      >
        <Form
          form={form}
          onFinish={onFinish}
        >
          <Form.Item
            name="name"
            label="名称"
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Space>
  )
}

export default App

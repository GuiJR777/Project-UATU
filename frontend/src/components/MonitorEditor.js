import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import allB3Tickers from '../allB3Tickers';

const MonitorEditor = ({ show, onHide, onSave, monitoring }) => {
    const [newData, setNewData] = useState({
        codigo_acao: monitoring.codigo_acao,
        intervalo_atualizacao: monitoring.intervalo_atualizacao / 60,
        alerta_compra: monitoring.alerta_compra || '',
        alerta_venda: monitoring.alerta_venda || '',
      });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setNewData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };

      const handleSave = () => {
        const newDataWithNumbers = {
          ...newData,
          alerta_compra: parseFloat(newData.alerta_compra),
          alerta_venda: parseFloat(newData.alerta_venda),
        };

        newDataWithNumbers.intervalo_atualizacao *= 60;

        onSave(newDataWithNumbers);
        onHide();
      };

      return (
        <Modal show={show} onHide={onHide}>
          <Modal.Header closeButton>
            <Modal.Title>Editar Ativo</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formCodigoAcao">
                <Form.Label>Código da Ação</Form.Label>
                <Form.Control as="select" name="codigo_acao" value={newData.codigo_acao} onChange={handleChange}>
                  {allB3Tickers.map((ticker) => (
                    <option key={ticker} value={ticker}>
                      {ticker}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formIntervaloAtualizacao">
                <Form.Label>Intervalo de Atualização</Form.Label>
                <Form.Control as="select" name="intervalo_atualizacao" value={newData.intervalo_atualizacao} onChange={handleChange}>
                  {[1, 2, 3, 5, 10, 15, 30, 60].map((minutes) => (
                    <option key={minutes} value={minutes}>
                      {`${minutes} ${minutes === 1 ? 'minuto' : 'minutos'}`}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="formAlertaCompra">
                <Form.Label>Alerta de Compra</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="alerta_compra"
                  value={newData.alerta_compra}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group controlId="formAlertaVenda">
                <Form.Label>Alerta de Venda</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="alerta_venda"
                  value={newData.alerta_venda}
                  onChange={handleChange}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Cancelar
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Concluir Edição
            </Button>
          </Modal.Footer>
        </Modal>
      );
    };


export default MonitorEditor;
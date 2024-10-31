import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export function ProductScreen({ route }) {
  const { product } = route.params;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>{product.cadp_descricao}</Text>
        <Text style={styles.code}>Código: {product.cadp_codigo}</Text>
        
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Preço:</Text>
          <Text style={styles.price}>
            R$ {product.cade_prvenda.toFixed(2)}
          </Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Estoque:</Text>
          <Text style={styles.value}>{product.cade_estoque1}</Text>
        </View>

        <View style={styles.infoRow}>
          <Text style={styles.label}>Última Auditoria:</Text>
          <Text style={styles.value}>
            {new Date(product.cade_dtauditoria).toLocaleDateString()}
          </Text>
        </View>

        {product.pecd_protocolo && (
          <View style={styles.pedidoInfo}>
            <Text style={styles.subtitle}>Pedido em Andamento</Text>
            <Text>Protocolo: {product.pecd_protocolo}</Text>
            <Text>Quantidade: {product.pecd_qtde}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  card: {
    margin: 15,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  code: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
  },
  priceLabel: {
    fontSize: 18,
    marginRight: 10,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
  },
  pedidoInfo: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
});
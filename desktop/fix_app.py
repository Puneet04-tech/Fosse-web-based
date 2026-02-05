import re

with open(r'd:\Fosse-web-based\desktop\app.py', 'r', encoding='utf-8') as f:
    content = f.read()

# Find where the corrupted section starts
corruption_start = content.find('    def calculate_statistics(self):')
before_corruption = content[:corruption_start]

# Write corrected version
corrected_after = '''    def calculate_statistics(self):
        """Calculate comprehensive statistics"""
        if not self.current_data or 'rows' not in self.current_data:
            self.stats_text.setHtml("<h3 style='color: #ef4444;'>⚠️ No data available</h3><p>Please upload a dataset first.</p>")
            return
        
        df = pd.DataFrame(self.current_data['rows'])
        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        
        if not numeric_cols:
            self.stats_text.setHtml("<h3 style='color: #ef4444;'>⚠️ No numeric data</h3><p>Dataset contains no numeric columns.</p>")
            return
        
        stats_html = "<h2 style='color: #3b82f6;'>📊 Comprehensive Statistical Analysis</h2>"
        stats_html += "<hr><br>"
        
        for col in numeric_cols:
            data = df[col].dropna()
            if len(data) == 0:
                continue
            
            stats_html += f"<h3 style='color: #8b5cf6;'>📈 {col}</h3>"
            stats_html += "<table style='width: 100%; border-collapse: collapse; margin-bottom: 20px;'>"
            stats_html += "<tr style='background: #e3f2fd;'>"
            stats_html += "<th style='padding: 8px; text-align: left; border: 1px solid #3b82f6;'>Metric</th>"
            stats_html += "<th style='padding: 8px; text-align: right; border: 1px solid #3b82f6;'>Value</th>"
            stats_html += "</tr>"
            
            stats_data = [
                ("Count", f"{len(data)}"),
                ("Mean", f"{data.mean():.4f}"),
                ("Median", f"{data.median():.4f}"),
                ("Std Dev", f"{data.std():.4f}"),
                ("Variance", f"{data.var():.4f}"),
                ("Min", f"{data.min():.4f}"),
                ("Max", f"{data.max():.4f}"),
                ("Range", f"{data.max() - data.min():.4f}"),
                ("Q1 (25%)", f"{data.quantile(0.25):.4f}"),
                ("Q2 (50%)", f"{data.quantile(0.50):.4f}"),
                ("Q3 (75%)", f"{data.quantile(0.75):.4f}"),
                ("IQR", f"{data.quantile(0.75) - data.quantile(0.25):.4f}"),
                ("Skewness", f"{stats.skew(data):.4f}"),
                ("Kurtosis", f"{stats.kurtosis(data):.4f}"),
            ]
            
            for i, (metric, value) in enumerate(stats_data):
                bg_color = "#ffffff" if i % 2 == 0 else "#f8fafc"
                stats_html += f"<tr style='background: {bg_color};'>"
                stats_html += f"<td style='padding: 6px; border: 1px solid #cbd5e1;'><strong>{metric}</strong></td>"
                stats_html += f"<td style='padding: 6px; border: 1px solid #cbd5e1; text-align: right;'>{value}</td>"
                stats_html += "</tr>"
            
            stats_html += "</table><br>"
        
        self.stats_text.setHtml(stats_html)
        self.status_bar.showMessage("✅ Statistics calculated successfully")

    def run_statistical_tests(self):
        """Run statistical tests"""
        if not self.current_data or 'rows' not in self.current_data:
            self.tests_text.setHtml("<h3 style='color: #ef4444;'>⚠️ No data available</h3>")
            return
        
        df = pd.DataFrame(self.current_data['rows'])
        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        
        if len(numeric_cols) < 1:
            self.tests_text.setHtml("<h3 style='color: #ef4444;'>⚠️ Insufficient data</h3>")
            return
        
        tests_html = "<h2 style='color: #3b82f6;'>🧪 Statistical Tests Results</h2>"
        tests_html += "<hr><br>"
        
        # Normality tests
        tests_html += "<h3 style='color: #8b5cf6;'>📊 Normality Tests (Shapiro-Wilk)</h3>"
        tests_html += "<p><em>Tests if data follows a normal distribution (p > 0.05 = normal)</em></p>"
        
        for col in numeric_cols[:5]:
            data = df[col].dropna()
            if len(data) >= 3:
                stat, p_value = stats.shapiro(data)
                result = "✅ Normal" if p_value > 0.05 else "❌ Not Normal"
                tests_html += f"<p><strong>{col}:</strong> p-value = {p_value:.6f} → {result}</p>"
        
        # Correlation tests
        if len(numeric_cols) >= 2:
            tests_html += "<br><h3 style='color: #8b5cf6;'>🔗 Correlation Analysis (Pearson)</h3>"
            col1, col2 = numeric_cols[0], numeric_cols[1]
            data1 = df[col1].dropna()
            data2 = df[col2].dropna()
            
            if len(data1) == len(data2) and len(data1) >= 3:
                corr, p_value = stats.pearsonr(data1, data2)
                tests_html += f"<p><strong>{col1} vs {col2}:</strong></p>"
                tests_html += f"<p>Correlation coefficient: {corr:.4f}</p>"
                tests_html += f"<p>P-value: {p_value:.6f}</p>"
                
                if abs(corr) > 0.7:
                    tests_html += "<p style='color: #10b981;'>✅ Strong correlation</p>"
                elif abs(corr) > 0.3:
                    tests_html += "<p style='color: #fbbf24;'>⚠️ Moderate correlation</p>"
                else:
                    tests_html += "<p style='color: #94a3b8;'>ℹ️ Weak correlation</p>"
        
        self.tests_text.setHtml(tests_html)
        self.status_bar.showMessage("✅ Statistical tests completed")

    def generate_insights(self):
        """Generate AI insights"""
        if not self.current_data or 'rows' not in self.current_data:
            self.insights_text.setHtml("<h3 style='color: #ef4444;'>⚠️ No data available</h3>")
            return
        
        df = pd.DataFrame(self.current_data['rows'])
        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        
        insights_html = "<h2 style='color: #3b82f6;'>💡 AI-Powered Data Insights</h2>"
        insights_html += f"<p><em>Generated on {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}</em></p>"
        insights_html += "<hr><br>"
        
        # Dataset overview
        insights_html += "<h3 style='color: #8b5cf6;'>📊 Dataset Overview</h3>"
        insights_html += f"<p>✅ Total records: <strong>{len(df)}</strong></p>"
        insights_html += f"<p>✅ Numeric features: <strong>{len(numeric_cols)}</strong></p>"
        insights_html += f"<p>✅ Data completeness: <strong>{(1 - df.isnull().sum().sum() / (len(df) * len(df.columns))) * 100:.1f}%</strong></p>"
        
        # Key findings
        insights_html += "<br><h3 style='color: #8b5cf6;'>🔍 Key Findings</h3>"
        insights_html += "<ul>"
        
        for col in numeric_cols[:5]:
            data = df[col].dropna()
            if len(data) > 0:
                mean_val = data.mean()
                std_val = data.std()
                cv = (std_val / mean_val * 100) if mean_val != 0 else 0
                
                insights_html += f"<li><strong>{col}:</strong> "
                if cv < 10:
                    insights_html += f"Very stable (CV: {cv:.1f}%) ✅"
                elif cv < 30:
                    insights_html += f"Moderate variation (CV: {cv:.1f}%) ⚠️"
                else:
                    insights_html += f"High variation (CV: {cv:.1f}%) 🚨"
                insights_html += "</li>"
        
        insights_html += "</ul>"
        
        # Anomaly detection
        insights_html += "<br><h3 style='color: #8b5cf6;'>🚨 Anomaly Detection</h3>"
        total_anomalies = 0
        
        for col in numeric_cols[:5]:
            data = df[col].dropna()
            if len(data) > 0:
                Q1 = data.quantile(0.25)
                Q3 = data.quantile(0.75)
                IQR = Q3 - Q1
                outliers = ((data < (Q1 - 1.5 * IQR)) | (data > (Q3 + 1.5 * IQR))).sum()
                total_anomalies += outliers
                
                if outliers > 0:
                    insights_html += f"<p>🚨 <strong>{col}:</strong> {outliers} outliers detected ({outliers/len(data)*100:.1f}%)</p>"
        
        if total_anomalies == 0:
            insights_html += "<p style='color: #10b981;'>✅ No significant outliers detected - data quality is excellent!</p>"
        
        self.insights_text.setHtml(insights_html)
        
        # Generate recommendations
        self.generate_recommendations(df, numeric_cols)
        
        self.status_bar.showMessage("🤖 AI insights generated successfully")

    def generate_recommendations(self, df, numeric_cols):
        """Generate recommendations"""
        rec_html = "<h2 style='color: #3b82f6;'>📋 Smart Recommendations</h2>"
        rec_html += "<hr><br>"
        
        rec_html += "<ol>"
        
        # Check for missing data
        missing_pct = (df.isnull().sum().sum() / (len(df) * len(df.columns))) * 100
        if missing_pct > 5:
            rec_html += f"<li><strong>Data Quality:</strong> {missing_pct:.1f}% missing data detected. Consider data imputation or cleaning. 🧹</li>"
        
        # Check for high variation
        high_var_cols = []
        for col in numeric_cols:
            data = df[col].dropna()
            if len(data) > 0:
                cv = (data.std() / data.mean() * 100) if data.mean() != 0 else 0
                if cv > 30:
                    high_var_cols.append(col)
        
        if high_var_cols:
            rec_html += f"<li><strong>Variability:</strong> High variation in {', '.join(high_var_cols)}. Monitor closely for stability. 📊</li>"
        
        # General recommendations
        rec_html += "<li><strong>Monitoring:</strong> Continue regular data collection for trend analysis. 📈</li>"
        rec_html += "<li><strong>Predictive Analytics:</strong> Consider implementing machine learning models for forecasting. 🤖</li>"
        rec_html += "<li><strong>Automation:</strong> Set up automated alerts for anomaly detection. 🔔</li>"
        rec_html += "<li><strong>Optimization:</strong> Analyze parameter relationships for efficiency improvements. ⚡</li>"
        
        rec_html += "</ol>"
        
        self.recommendations_text.setHtml(rec_html)

    def refresh_current_chart(self):
        self.update_chart_type(self.chart_type_combo.currentText())

    def show_error_message(self, error_msg):
        ax = self.figure.add_subplot(111)
        ax.text(0.5, 0.5, f'Error: {error_msg}', 
                ha='center', va='center', fontsize=12, 
                transform=ax.transAxes, color='red', fontweight='bold')
        ax.set_title('Chart Error', fontsize=16, fontweight='bold', pad=20)
        ax.axis('off')
        self.canvas.draw()

    def search_table(self):
        search_text = self.search_box.text().lower()
        for row in range(self.table.rowCount()):
            match = False
            for col in range(self.table.columnCount()):
                item = self.table.item(row, col)
                if item and search_text in item.text().lower():
                    match = True
                    break
            self.table.setRowHidden(row, not match)

    def export_table(self):
        filename, _ = QFileDialog.getSaveFileName(self, 'Export Table', '', 'CSV Files (*.csv)')
        if filename:
            try:
                with open(filename, 'w', newline='', encoding='utf-8') as f:
                    writer = __import__('csv').writer(f)
                    headers = [self.table.horizontalHeaderItem(i).text() 
                             for i in range(self.table.columnCount())]
                    writer.writerow(headers)
                    for row in range(self.table.rowCount()):
                        if not self.table.isRowHidden(row):
                            row_data = [self.table.item(row, col).text() if self.table.item(row, col) else '' 
                                      for col in range(self.table.columnCount())]
                            writer.writerow(row_data)
                self.status_bar.showMessage(f"✅ Table exported to {filename}")
            except Exception as e:
                self.status_bar.showMessage(f"❌ Export error: {str(e)}")

    def clear_data(self):
        self.current_data = None
        self.table.setRowCount(0)
        self.table.setColumnCount(0)
        self.figure.clear()
        self.canvas.draw()
        self.status_bar.showMessage("🗑️ Data cleared")

if __name__ == '__main__':
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())
'''

with open(r'd:\Fosse-web-based\desktop\app.py', 'w', encoding='utf-8') as f:
    f.write(before_corruption + corrected_after)

print('File corrected successfully!')

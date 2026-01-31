import sys
import os
import requests
import pandas as pd
from PyQt5.QtWidgets import *
from PyQt5.QtCore import Qt, QTimer, QThread, pyqtSignal
from PyQt5.QtGui import QFont
from matplotlib.backends.backend_qt5agg import FigureCanvasQTAgg as FigureCanvas
from matplotlib.figure import Figure
import matplotlib.pyplot as plt
import numpy as np

API_BASE = os.environ.get('API_URL', 'http://127.0.0.1:8000/api')

class WorkerThread(QThread):
    finished = pyqtSignal(object)
    error = pyqtSignal(str)
    
    def __init__(self, func, *args, **kwargs):
        super().__init__()
        self.func = func
        self.args = args
        self.kwargs = kwargs
    
    def run(self):
        try:
            result = self.func(*self.args, **self.kwargs)
            self.finished.emit(result)
        except Exception as e:
            self.error.emit(str(e))

class MainWindow(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle('🚀 Elite Analytics Suite - Chemical Equipment Analysis')
        self.setGeometry(100, 100, 1400, 900)
        
        # Variables
        self.selected_file = None
        self.datasets = []
        self.current_data = None
        self.is_processing = False
        
        # Apply modern dark theme
        self.setStyleSheet("""
            QMainWindow { background: #1e293b; color: #f1f5f9; }
            QTabWidget::pane { border: 2px solid #3b82f6; background: rgba(30, 41, 59, 0.95); border-radius: 12px; }
            QTabBar::tab { background: #1e40af; color: white; padding: 12px 24px; margin-right: 4px; border-top-left-radius: 8px; border-top-right-radius: 8px; font-weight: 600; }
            QTabBar::tab:selected { background: #3b82f6; }
            QGroupBox { font-weight: bold; font-size: 12pt; color: #e2e8f0; border: 2px solid #3b82f6; border-radius: 12px; margin-top: 10px; padding-top: 10px; background: rgba(30, 41, 59, 0.8); }
            QGroupBox::title { subcontrol-origin: margin; left: 10px; padding: 0 10px 0 10px; color: #93c5fd; }
            QPushButton { background: #3b82f6; color: white; border: none; padding: 12px 24px; border-radius: 8px; font-weight: 600; font-size: 11pt; }
            QPushButton:hover { background: #60a5fa; }
            QPushButton:disabled { background: #64748b; }
            QLineEdit { padding: 10px; border: 2px solid #3b82f6; border-radius: 8px; background: rgba(255,255,255,0.1); color: #f1f5f9; font-size: 11pt; }
            QComboBox { padding: 8px; border: 2px solid #3b82f6; border-radius: 8px; background: rgba(255,255,255,0.1); color: #f1f5f9; font-size: 11pt; }
            QProgressBar { border: 2px solid #3b82f6; border-radius: 8px; text-align: center; font-weight: 600; color: #f1f5f9; background: rgba(30, 41, 59, 0.8); }
            QProgressBar::chunk { background: #60a5fa; border-radius: 6px; }
            QTableWidget { background: rgba(255, 255, 255, 0.95); color: #0f172a; border: 2px solid #3b82f6; border-radius: 12px; font-size: 10pt; }
            QTableWidget::item:alternate { background: rgba(59, 130, 246, 0.05); }
            QHeaderView::section { background: #3b82f6; color: white; padding: 8px; border: none; font-weight: 600; }
            QTextEdit { background: rgba(255, 255, 255, 0.95); color: #0f172a; border: 2px solid #3b82f6; border-radius: 8px; padding: 10px; font-family: 'Consolas', monospace; }
            QLabel { color: #f1f5f9; font-size: 11pt; }
        """)
        
        self.setup_status_bar()
        self.init_ui()
        QTimer.singleShot(1000, self.initialize_app)

    def setup_status_bar(self):
        self.status_bar = QStatusBar()
        self.status_bar.setStyleSheet("QStatusBar { background: rgba(59, 130, 246, 0.2); color: #e2e8f0; border-top: 2px solid #3b82f6; padding: 8px; font-size: 11pt; font-weight: 600; }")
        self.setStatusBar(self.status_bar)
        self.status_bar.showMessage("🚀 Starting Elite Analytics Suite...")

    def init_ui(self):
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        main_layout = QVBoxLayout()
        main_layout.setSpacing(20)
        main_layout.setContentsMargins(25, 25, 25, 25)
        
        # Header
        header_frame = self.create_header_section()
        main_layout.addWidget(header_frame)
        
        # Tabs
        self.tab_widget = QTabWidget()
        self.tab_widget.addTab(self.create_file_operations_tab(), "📁 Data Operations")
        self.tab_widget.addTab(self.create_visualization_tab(), "📈 Analytics")
        self.tab_widget.addTab(self.create_data_table_tab(), "📋 Data Table")
        
        main_layout.addWidget(self.tab_widget)
        central_widget.setLayout(main_layout)

    def create_header_section(self):
        header_frame = QFrame()
        header_frame.setStyleSheet("QFrame { background: rgba(59, 130, 246, 0.15); border: 2px solid rgba(59, 130, 246, 0.3); border-radius: 16px; padding: 20px; }")
        header_layout = QVBoxLayout(header_frame)
        
        # Title
        title_label = QLabel("🚀 Elite Analytics Suite")
        title_label.setFont(QFont("Arial", 24, QFont.Bold))
        title_label.setStyleSheet("color: #93c5fd; margin-bottom: 5px;")
        header_layout.addWidget(title_label)
        
        subtitle_label = QLabel("Advanced Chemical Equipment Data Analysis & Anomaly Detection System")
        subtitle_label.setFont(QFont("Arial", 12))
        subtitle_label.setStyleSheet("color: #cbd5e1; margin-bottom: 15px;")
        header_layout.addWidget(subtitle_label)
        
        # Connection Status
        self.connection_label = QLabel("🔍 Initializing connection...")
        self.connection_label.setStyleSheet("padding: 10px; border: 2px dashed #fbbf24; border-radius: 8px; background: rgba(251, 191, 36, 0.1); color: #fbbf24; font-weight: 600;")
        header_layout.addWidget(self.connection_label)
        
        # Add retry button
        self.retry_connection_btn = QPushButton("🔄 Retry Connection")
        self.retry_connection_btn.clicked.connect(self.initialize_app)
        self.retry_connection_btn.setStyleSheet("""
            QPushButton { 
                background: #f59e0b; 
                color: white; 
                border: none; 
                padding: 12px 24px; 
                border-radius: 8px; 
                font-weight: 600; 
                font-size: 11pt; 
            }
            QPushButton:hover { background: #fbbf24; }
        """)
        header_layout.addWidget(self.retry_connection_btn)
        
        return header_frame

    def create_file_operations_tab(self):
        tab_widget = QWidget()
        layout = QVBoxLayout(tab_widget)
        
        # File Selection
        file_group = QGroupBox("📁 Data Import")
        file_layout = QVBoxLayout()
        
        self.file_label = QLabel("📄 No file selected")
        self.file_label.setStyleSheet("padding: 15px; border: 2px dashed #64748b; border-radius: 8px; background: rgba(100, 116, 139, 0.1); color: #94a3b8; font-weight: 600;")
        file_layout.addWidget(self.file_label)
        
        button_layout = QHBoxLayout()
        self.choose_btn = QPushButton("📁 Select CSV File")
        self.choose_btn.clicked.connect(self.choose_file)
        self.upload_btn = QPushButton("⬆️ Upload & Analyze")
        self.upload_btn.clicked.connect(self.upload)
        self.upload_btn.setEnabled(False)
        button_layout.addWidget(self.choose_btn)
        button_layout.addWidget(self.upload_btn)
        file_layout.addLayout(button_layout)
        
        self.progress_bar = QProgressBar()
        self.progress_bar.setVisible(False)
        file_layout.addWidget(self.progress_bar)
        
        self.msg = QLabel("")
        self.msg.setStyleSheet("padding: 15px; border-radius: 8px; font-weight: 600;")
        file_layout.addWidget(self.msg)
        
        file_group.setLayout(file_layout)
        layout.addWidget(file_group)
        
        # Control buttons
        control_group = QGroupBox("🎛️ Data Management")
        control_layout = QGridLayout()
        self.refresh_btn = QPushButton("🔄 Refresh History")
        self.refresh_btn.clicked.connect(self.load_history)
        self.clear_btn = QPushButton("🗑️ Clear Data")
        self.clear_btn.clicked.connect(self.clear_data)
        self.export_btn = QPushButton("📤 Export CSV")
        self.export_btn.clicked.connect(self.export_table)
        
        control_layout.addWidget(self.refresh_btn, 0, 0)
        control_layout.addWidget(self.clear_btn, 0, 1)
        control_layout.addWidget(self.export_btn, 0, 2)
        control_group.setLayout(control_layout)
        layout.addWidget(control_group)
        layout.addStretch()
        
        return tab_widget

    def create_visualization_tab(self):
        tab_widget = QWidget()
        layout = QVBoxLayout(tab_widget)
        
        # Chart controls
        controls_layout = QHBoxLayout()
        self.chart_type_combo = QComboBox()
        self.chart_type_combo.addItems([
            "Equipment Distribution (Pie Chart)",
            "Parameter Analysis (Bar Chart)", 
            "Data Summary (Text Report)",
            "Anomaly Detection (Bar Chart)"
        ])
        self.chart_type_combo.currentTextChanged.connect(self.update_chart_type)
        controls_layout.addWidget(QLabel("Chart Type:"))
        controls_layout.addWidget(self.chart_type_combo)
        self.refresh_chart_btn = QPushButton("🔄 Refresh Chart")
        self.refresh_chart_btn.clicked.connect(self.refresh_current_chart)
        controls_layout.addWidget(self.refresh_chart_btn)
        controls_layout.addStretch()
        layout.addLayout(controls_layout)
        
        # Matplotlib figure
        self.figure = Figure(figsize=(12, 8), dpi=100)
        self.figure.patch.set_facecolor('none')
        self.canvas = FigureCanvas(self.figure)
        self.canvas.setStyleSheet("background: rgba(255,255,255,0.98); border: 2px solid #3b82f6; border-radius: 12px;")
        layout.addWidget(self.canvas)
        
        return tab_widget

    def create_data_table_tab(self):
        tab_widget = QWidget()
        layout = QVBoxLayout(tab_widget)
        
        # Table info
        self.table_info_label = QLabel("📊 Table: No data loaded")
        self.table_info_label.setStyleSheet("color: #93c5fd; font-weight: 600; font-size: 11pt; padding: 10px; background: rgba(59, 130, 246, 0.1); border-radius: 8px;")
        layout.addWidget(self.table_info_label)
        
        # Search
        search_layout = QHBoxLayout()
        self.search_box = QLineEdit()
        self.search_box.setPlaceholderText("🔍 Search data...")
        self.search_box.textChanged.connect(self.search_table)
        search_layout.addWidget(QLabel("Search:"))
        search_layout.addWidget(self.search_box)
        search_layout.addStretch()
        layout.addLayout(search_layout)
        
        # Data table
        self.table = QTableWidget()
        self.table.setAlternatingRowColors(True)
        self.table.setSortingEnabled(True)
        self.table.horizontalHeader().setSectionResizeMode(QHeaderView.Interactive)
        layout.addWidget(self.table)
        
        return tab_widget

    def initialize_app(self):
        try:
            self.status_bar.showMessage("Testing connection to backend...")
            self.connection_label.setText("🔍 Testing connection to backend...")
            
            # Test connection with simple request
            response = requests.get(f'{API_BASE}/datasets/', timeout=5)
            
            if response.status_code == 200:
                self.connection_label.setText("✅ Connected to backend successfully")
                self.connection_label.setStyleSheet("padding: 10px; border: 2px solid #10b981; border-radius: 8px; background: rgba(16, 185, 129, 0.1); color: #10b981; font-weight: 600;")
                self.status_bar.showMessage("✅ Connected to backend - Ready to use")
                
                # Load initial data
                QTimer.singleShot(500, self.load_history)
            else:
                raise Exception(f"HTTP {response.status_code}")
                
        except requests.exceptions.ConnectionError as e:
            self.connection_label.setText("❌ Backend server not running")
            self.connection_label.setStyleSheet("padding: 10px; border: 2px solid #ef4444; border-radius: 8px; background: rgba(239, 68, 68, 0.1); color: #ef4444; font-weight: 600;")
            self.status_bar.showMessage("❌ Backend server not running - Please start Django server")
            
            # Show simple error message
            QMessageBox.critical(self, 'Connection Error', 
                              f'❌ Cannot connect to backend at {API_BASE}\n\n'
                              f'🔧 QUICK FIX:\n'
                              f'1. Open Command Prompt\n'
                              f'2. Run: cd backend\n'
                              f'3. Run: python manage.py runserver\n'
                              f'4. Then restart this desktop app\n\n'
                              f'Backend URL: {API_BASE}')
                              
        except Exception as e:
            self.connection_label.setText(f"❌ Connection failed: {str(e)}")
            self.connection_label.setStyleSheet("padding: 10px; border: 2px solid #ef4444; border-radius: 8px; background: rgba(239, 68, 68, 0.1); color: #ef4444; font-weight: 600;")
            self.status_bar.showMessage("❌ Connection failed")

    def choose_file(self):
        f, _ = QFileDialog.getOpenFileName(self, 'Select CSV File for Analysis', '', 'CSV Files (*.csv);;All Files (*)')
        if f:
            self.selected_file = f
            file_size = os.path.getsize(f)
            self.file_label.setText(f"📄 {os.path.basename(f)} ({file_size:,} bytes)")
            self.file_label.setStyleSheet("padding: 15px; border: 2px solid #10b981; border-radius: 8px; background: rgba(16, 185, 129, 0.1); color: #10b981; font-weight: 600;")
            self.upload_btn.setEnabled(True)
            self.status_bar.showMessage(f"📁 File selected: {os.path.basename(f)}")

    def upload(self):
        if not self.selected_file:
            QMessageBox.warning(self, 'No File Selected', 'Please select a CSV file first.')
            return
        
        if self.is_processing:
            QMessageBox.information(self, 'Processing', 'Upload in progress. Please wait...')
            return
        
        self.is_processing = True
        self.progress_bar.setVisible(True)
        self.progress_bar.setRange(0, 0)
        self.choose_btn.setEnabled(False)
        self.upload_btn.setEnabled(False)
        self.status_bar.showMessage("⬆️ Uploading and analyzing data...")
        
        self.worker = WorkerThread(self._upload_file)
        self.worker.finished.connect(self.on_upload_success)
        self.worker.error.connect(self.on_upload_error)
        self.worker.start()

    def _upload_file(self):
        try:
            with open(self.selected_file, 'rb') as f:
                files = {'file': f}
                # NO AUTHENTICATION - just upload the file
                r = requests.post(f'{API_BASE}/upload/', files=files, timeout=60)
                r.raise_for_status()
                return r.json()
        except Exception as e:
            raise Exception(f"Upload failed: {str(e)}")

    def on_upload_success(self, result):
        self.is_processing = False
        self.progress_bar.setVisible(False)
        self.choose_btn.setEnabled(True)
        
        if 'error' in result:
            self.msg.setText(f"❌ Error: {result['error']}")
            self.msg.setStyleSheet("padding: 15px; border-radius: 8px; font-weight: 600; background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 2px solid #ef4444;")
            self.status_bar.showMessage(f"❌ Upload failed: {result['error']}")
        else:
            self.msg.setText(f"✅ Success: {result.get('filename', 'File')} uploaded successfully!")
            self.msg.setStyleSheet("padding: 15px; border-radius: 8px; font-weight: 600; background: rgba(16, 185, 129, 0.1); color: #10b981; border: 2px solid #10b981;")
            self.status_bar.showMessage("✅ Upload successful! Loading data...")
            
            if 'id' in result:
                self.load_uploaded_data(result['id'])
            self.load_history()

    def on_upload_error(self, error_msg):
        self.is_processing = False
        self.progress_bar.setVisible(False)
        self.choose_btn.setEnabled(True)
        self.upload_btn.setEnabled(True)
        
        self.msg.setText(f"❌ Upload Error: {error_msg}")
        self.msg.setStyleSheet("padding: 15px; border-radius: 8px; font-weight: 600; background: rgba(239, 68, 68, 0.1); color: #ef4444; border: 2px solid #ef4444;")
        self.status_bar.showMessage(f"❌ Upload error: {error_msg}")

    def load_history(self):
        if self.is_processing:
            return
            
        self.is_processing = True
        self.refresh_btn.setEnabled(False)
        self.status_bar.showMessage("🔄 Loading dataset history...")
        
        self.worker = WorkerThread(self._load_history)
        self.worker.finished.connect(self.on_history_loaded)
        self.worker.error.connect(self.on_history_error)
        self.worker.start()

    def _load_history(self):
        try:
            r = requests.get(f'{API_BASE}/datasets/', timeout=15)
            r.raise_for_status()
            return r.json()
        except Exception as e:
            raise Exception(f"Failed to load history: {str(e)}")

    def on_history_loaded(self, datasets):
        self.is_processing = False
        self.refresh_btn.setEnabled(True)
        self.datasets = datasets
        self.status_bar.showMessage(f"📊 Loaded {len(datasets)} datasets")

    def on_history_error(self, error_msg):
        self.is_processing = False
        self.refresh_btn.setEnabled(True)
        self.status_bar.showMessage(f"❌ Error loading history: {error_msg}")

    def load_uploaded_data(self, dataset_id):
        self.worker = WorkerThread(self._load_dataset_data, dataset_id)
        self.worker.finished.connect(self.on_data_loaded)
        self.worker.error.connect(self.on_data_error)
        self.worker.start()

    def _load_dataset_data(self, dataset_id):
        try:
            r = requests.get(f'{API_BASE}/datasets/{dataset_id}/data/', timeout=15)
            r.raise_for_status()
            return r.json()
        except Exception as e:
            raise Exception(f"Failed to load data: {str(e)}")

    def on_data_loaded(self, data):
        self.current_data = data
        
        if 'rows' in data:
            self.populate_table(data['rows'])
        
        if 'summary' in data:
            self.populate_summary(data['summary'])
        
        self.status_bar.showMessage("✅ Data loaded successfully")
        self.tab_widget.setCurrentIndex(1)  # Analytics tab
        self.update_chart_type(self.chart_type_combo.currentText())

    def on_data_error(self, error_msg):
        self.status_bar.showMessage(f"❌ Error loading data: {error_msg}")

    def populate_table(self, rows):
        if not rows:
            self.table.setRowCount(0)
            self.table.setColumnCount(0)
            self.table_info_label.setText("📊 Table: No data loaded")
            return
        
        headers = list(rows[0].keys())
        self.table.setColumnCount(len(headers))
        self.table.setHorizontalHeaderLabels(headers)
        
        self.table.setRowCount(len(rows))
        for i, row in enumerate(rows):
            for j, (key, value) in enumerate(row.items()):
                item = QTableWidgetItem(str(value))
                self.table.setItem(i, j, item)
        
        self.table.resizeColumnsToContents()
        self.table_info_label.setText(f"📊 Table: {len(rows)} rows × {len(headers)} columns")

    def populate_summary(self, summary):
        pass

    def update_chart_type(self, chart_type):
        if not self.current_data:
            self.show_no_data_message()
            return
            
        self.figure.clear()
        self.figure.patch.set_facecolor('none')
        
        try:
            if "Equipment Distribution" in chart_type:
                self.create_equipment_distribution_chart()
            elif "Parameter Analysis" in chart_type:
                self.create_parameter_analysis_chart()
            elif "Data Summary" in chart_type:
                self.create_data_summary_chart()
            elif "Anomaly Detection" in chart_type:
                self.create_anomaly_detection_chart()
        except Exception as e:
            self.show_error_message(f"Error creating chart: {str(e)}")

    def show_no_data_message(self):
        ax = self.figure.add_subplot(111)
        ax.text(0.5, 0.5, 'No data available\nPlease upload a CSV file first', 
                ha='center', va='center', fontsize=16, 
                transform=ax.transAxes, color='gray', fontweight='bold')
        ax.set_title('No Data Available', fontsize=16, fontweight='bold', pad=20)
        ax.axis('off')
        self.canvas.draw()

    def show_error_message(self, error_msg):
        ax = self.figure.add_subplot(111)
        ax.text(0.5, 0.5, f'Error: {error_msg}', 
                ha='center', va='center', fontsize=12, 
                transform=ax.transAxes, color='red', fontweight='bold')
        ax.set_title('Chart Error', fontsize=16, fontweight='bold', pad=20)
        ax.axis('off')
        self.canvas.draw()

    def create_equipment_distribution_chart(self):
        if not self.current_data or 'summary' not in self.current_data:
            self.show_no_data_message()
            return
            
        summary = self.current_data['summary']
        if 'equipment_types' not in summary:
            self.show_no_data_message()
            return
            
        ax = self.figure.add_subplot(111)
        equipment = summary['equipment_types']
        labels = list(equipment.keys())
        sizes = list(equipment.values())
        
        colors = plt.cm.Set3(np.linspace(0, 1, len(labels)))
        wedges, texts, autotexts = ax.pie(sizes, labels=labels, autopct='%1.1f%%', colors=colors, startangle=90)
        
        for autotext in autotexts:
            autotext.set_color('white')
            autotext.set_fontweight('bold')
        
        ax.set_title('Equipment Distribution', fontsize=16, fontweight='bold', pad=20)
        self.figure.tight_layout()
        self.canvas.draw()

    def create_parameter_analysis_chart(self):
        if not self.current_data or 'rows' not in self.current_data:
            self.show_no_data_message()
            return
            
        df = pd.DataFrame(self.current_data['rows'])
        numeric_cols = df.select_dtypes(include=[np.number]).columns.tolist()
        
        if not numeric_cols:
            self.show_no_data_message()
            return
            
        ax = self.figure.add_subplot(111)
        averages = df[numeric_cols].mean()
        
        bars = ax.bar(range(len(averages)), averages.values, color=plt.cm.viridis(np.linspace(0, 1, len(averages))))
        
        ax.set_xlabel('Parameters', fontsize=12, fontweight='bold')
        ax.set_ylabel('Average Values', fontsize=12, fontweight='bold')
        ax.set_title('Parameter Analysis - Average Values', fontsize=16, fontweight='bold', pad=20)
        ax.set_xticks(range(len(averages)))
        ax.set_xticklabels(averages.index, rotation=45, ha='right')
        
        for bar, value in zip(bars, averages.values):
            ax.text(bar.get_x() + bar.get_width()/2, bar.get_height() + 0.01, f'{value:.2f}', ha='center', va='bottom', fontweight='bold')
        
        self.figure.tight_layout()
        self.canvas.draw()

    def create_data_summary_chart(self):
        if not self.current_data or 'summary' not in self.current_data:
            self.show_no_data_message()
            return
            
        summary = self.current_data['summary']
        ax = self.figure.add_subplot(111)
        
        stats_text = f"""Dataset Summary Statistics
=========================
Total Records: {summary.get('total_count', 'N/A')}

Statistical Averages:"""
        
        if 'averages' in summary:
            for param, avg in summary['averages'].items():
                stats_text += f"\n  {param}: {avg:.2f}"
        
        if 'anomalies' in summary and summary['anomalies']:
            stats_text += f"\n\nAnomalies Detected: {len(summary['anomalies'])}"
        
        ax.text(0.1, 0.9, stats_text, transform=ax.transAxes, fontsize=12, 
                verticalalignment='top', fontfamily='monospace',
                bbox=dict(boxstyle='round', facecolor='lightblue', alpha=0.8))
        
        ax.set_title('Data Summary Report', fontsize=16, fontweight='bold', pad=20)
        ax.axis('off')
        self.figure.tight_layout()
        self.canvas.draw()

    def create_anomaly_detection_chart(self):
        if not self.current_data or 'summary' not in self.current_data:
            self.show_no_data_message()
            return
            
        summary = self.current_data['summary']
        if 'anomalies' not in summary or not summary['anomalies']:
            ax = self.figure.add_subplot(111)
            ax.text(0.5, 0.5, 'No Anomalies Detected', ha='center', va='center', fontsize=16, 
                    transform=ax.transAxes, color='green', fontweight='bold')
            ax.set_title('Anomaly Detection Results', fontsize=16, fontweight='bold', pad=20)
            self.canvas.draw()
            return
            
        ax = self.figure.add_subplot(111)
        anomalies = summary['anomalies']
        
        equipment_counts = {}
        for anomaly in anomalies:
            equipment = anomaly.get('equipment', 'Unknown')
            equipment_counts[equipment] = equipment_counts.get(equipment, 0) + 1
        
        if equipment_counts:
            plt.xticks(rotation=45, ha='right')
        
        self.figure.tight_layout()
        self.canvas.draw()

    def refresh_current_chart(self):
        self.update_chart_type(self.chart_type_combo.currentText())

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
        if self.table.rowCount() == 0:
            QMessageBox.information(self, 'No Data', 'No data to export.')
            return
        
        filename, _ = QFileDialog.getSaveFileName(self, 'Export CSV', '', 'CSV Files (*.csv)')
        if filename:
            try:
                headers = []
                for col in range(self.table.columnCount()):
                    headers.append(self.table.horizontalHeaderItem(col).text())
                
                data = []
                for row in range(self.table.rowCount()):
                    if not self.table.isRowHidden(row):
                        row_data = []
                        for col in range(self.table.columnCount()):
                            item = self.table.item(row, col)
                            row_data.append(item.text() if item else '')
                        data.append(row_data)
                
                df = pd.DataFrame(data, columns=headers)
                df.to_csv(filename, index=False)
                
                QMessageBox.information(self, 'Export Successful', f'Data exported to {filename}')
                self.status_bar.showMessage(f"📤 Data exported to {os.path.basename(filename)}")
            except Exception as e:
                QMessageBox.critical(self, 'Export Error', f'Failed to export data: {str(e)}')

    def clear_data(self):
        reply = QMessageBox.question(self, 'Clear Data', 'Are you sure you want to clear all data?', QMessageBox.Yes | QMessageBox.No)
        
        if reply == QMessageBox.Yes:
            self.selected_file = None
            self.datasets = []
            self.current_data = None
            
            self.file_label.setText("📄 No file selected")
            self.file_label.setStyleSheet("padding: 15px; border: 2px dashed #64748b; border-radius: 8px; background: rgba(100, 116, 139, 0.1); color: #94a3b8; font-weight: 600;")
            self.upload_btn.setEnabled(False)
            self.table.setRowCount(0)
            self.table.setColumnCount(0)
            self.table_info_label.setText("📊 Table: No data loaded")
            self.figure.clear()
            self.canvas.draw()
            self.msg.setText("")
            
            self.status_bar.showMessage("🗑️ All data cleared")

def main():
    app = QApplication(sys.argv)
    window = MainWindow()
    window.show()
    sys.exit(app.exec_())

if __name__ == '__main__':
    main()

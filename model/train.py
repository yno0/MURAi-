import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2'
os.environ['TF_ENABLE_ONEDNN_OPTS'] = '0'

import pandas as pd
from datasets import Dataset
from transformers import BertTokenizer, BertForSequenceClassification, Trainer, TrainingArguments
from sklearn.metrics import accuracy_score, precision_recall_fscore_support

# Load the training and validation datasets
train_df = pd.read_csv('data/train.csv')
val_df = pd.read_csv('data/val.csv')

# Convert them to Hugging Face Datasets
train_dataset = Dataset.from_pandas(train_df)
val_dataset = Dataset.from_pandas(val_df)

# Initialize the tokenizer for BERT multilingual model
tokenizer = BertTokenizer.from_pretrained('bert-base-multilingual-cased')

# Tokenize the data
def tokenize_function(examples):
    return tokenizer(examples['text'], padding=True, truncation=True, max_length=256)

# Apply tokenization to both training and validation datasets
train_dataset = train_dataset.map(tokenize_function, batched=True)
val_dataset = val_dataset.map(tokenize_function, batched=True)

# Load the pre-trained BERT model for sequence classification
model = BertForSequenceClassification.from_pretrained('bert-base-multilingual-cased', num_labels=2)

# Define the training arguments
training_args = TrainingArguments(
    output_dir='./results',
    num_train_epochs=3,
    per_device_train_batch_size=16,
    per_device_eval_batch_size=64,
    warmup_steps=500,
    weight_decay=0.01,
    logging_dir='./logs',
    do_eval=True,                    # Enable evaluation
    eval_steps=100,                  # Evaluate every 100 steps
    save_steps=100,                  # Save model every 100 steps
    save_total_limit=3,             # Keep only the last 3 checkpoints
    load_best_model_at_end=True,    
    metric_for_best_model='accuracy',
    greater_is_better=True,
    logging_steps=100,
    report_to="none"                # Disable wandb logging
)

def compute_metrics(pred):
    labels = pred.label_ids
    preds = pred.predictions.argmax(-1)
    precision, recall, f1, _ = precision_recall_fscore_support(labels, preds, average='binary')
    acc = accuracy_score(labels, preds)
    return {
        'accuracy': acc,
        'f1': f1,
        'precision': precision,
        'recall': recall
    }

# Initialize the Trainer object
trainer = Trainer(
    model=model,                         # model to train
    args=training_args,                  # training arguments
    train_dataset=train_dataset,         # training dataset
    eval_dataset=val_dataset,            # validation dataset
    tokenizer=tokenizer,                 # tokenizer for preprocessing
    compute_metrics=compute_metrics      # function to compute metrics
)

# Start training
trainer.train()

# Save the trained model and tokenizer
model.save_pretrained('./local_model')
tokenizer.save_pretrained('./local_model')

# Evaluate the model
results = trainer.evaluate()
print("Validation Results:", results)
